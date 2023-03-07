from django.http import JsonResponse
from rest_framework.views import APIView
from core.models.user_model import User
from core.serializers.dynamic_serializers import UserSerializer
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from core.cache import recent_tweet_cache

from http import HTTPStatus

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)
# CACHE_STRING = 'RECENT_TWEETS'
class RecentTweetsView(APIView):

    http_method_names = ['get']

    def get_user_serializer(self, user, fields):
        return UserSerializer(user, fields=fields)

    def get_user(self, email):
        return User.objects.filter(email=email)[0]

    def store_to_cache(self, data, user_email):
        recent_tweet_cache.set_to_cache(user_email, data, timeout=None)

    def get_from_cache(self, user_email):
        return recent_tweet_cache.get_from_cache(user_email)

    def get_data(self, user_email):
        cache_response = self.get_from_cache(user_email)
        if cache_response:
            return cache_response

    def get(self, request, force_update="False"):
        recent_tweets_field = ['recent_tweets']
        user_serializer = None
        cache_data = None
        if force_update.lower() == "false":
            data = self.get_data(request.user.email)
            if not data:
                user_serializer = self.get_user_serializer(request.user, recent_tweets_field)
                self.store_to_cache(user_serializer.data, user_email=request.user.email)
            else:
                cache_data = data

        elif force_update.lower() == "true":
            user = self.get_user(request.user)
            User.objects.update_recent_tweets(user)
            user_serializer = self.get_user_serializer(request.user, recent_tweets_field)
            self.store_to_cache(user_serializer.data, request.user.email)

        else:
            error = {
                "error": "Invalid query"
            }
            return JsonResponse(error, status=HTTPStatus.BAD_REQUEST)

        if not cache_data:
            return JsonResponse(user_serializer.data, status=HTTPStatus.OK.value)

        else:
            return JsonResponse(cache_data, status=HTTPStatus.OK.value)
