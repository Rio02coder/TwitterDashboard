from django.http import JsonResponse
from rest_framework.views import APIView
from core.models.user_model import User
from core.serializers.dynamic_serializers import UserSerializer
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from core.cache import last_month_tweet_cache
import datetime

from http import HTTPStatus

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)
CACHE_STRING = 'LAST_MONTH_TWEETS'


class LastMonthTweetsView(APIView):

    http_method_names = ['get']

    def seconds_to_next_month(self):
        now = datetime.datetime.now()
        year = now.year
        month = now.month
        if month == 12:
            year += 1
            month = 1
        else:
            month += 1
        start_of_next_month = datetime.datetime(year, month, 1)
        time_to_next_month = start_of_next_month - now
        return time_to_next_month.total_seconds()

    def get_user_serializer(self, user, fields):
        return UserSerializer(user, fields=fields)

    def get_user(self, email):
        return User.objects.filter(email=email)[0]

    def store_to_cache(self, data, user_email):
        cache_timeout = self.seconds_to_next_month()
        last_month_tweet_cache.set_to_cache(user_email, data, timeout=cache_timeout)

    def get_from_cache(self, user_email):
        return last_month_tweet_cache.get_from_cache(user_email)

    def get_data(self, user_email):
        cache_response = self.get_from_cache(user_email)
        if cache_response:
            print("Cache response")
            return cache_response

    def get(self, request):
        last_month_tweets_field = ['last_month_tweets']
        user_serializer = None
        cache_data = None
        data = self.get_data(request.user.email)
        if not data:
            user = self.get_user(request.user)
            User.objects.update_last_month_tweets(user)
            user_serializer = self.get_user_serializer(request.user, last_month_tweets_field)
            print(user.last_fetched_month)
            self.store_to_cache(user_serializer.data, request.user.email)
        else:
            cache_data = data

        if not cache_data:
            return JsonResponse(user_serializer.data, status=HTTPStatus.OK.value)

        else:
            return JsonResponse(cache_data, status=HTTPStatus.OK.value)
