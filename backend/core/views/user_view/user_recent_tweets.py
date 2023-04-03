from django.http import JsonResponse
from rest_framework.views import APIView
from core.models.user_model import User
from core.cache import recent_tweet_cache
from core.utilities.user_data import user_data
from http import HTTPStatus


class RecentTweetsView(APIView):

    http_method_names = ['get']

    def store_to_cache(self, data, user_email):
        recent_tweet_cache.set_to_cache(user_email, data, timeout=None)

    def get_from_cache(self, user_email):
        return recent_tweet_cache.get_from_cache(user_email)

    def get_data(self, user_email):
        cache_response = self.get_from_cache(user_email)
        if cache_response:
            return cache_response

    def get_error_response(self, error_string):
        return {
            "error": error_string
        }

    def get(self, request, force_update="False"):
        recent_tweets_field = ['recent_tweets']
        user_serializer = None
        cache_data = None
        if force_update.lower() == "false":
            data = self.get_data(request.user.email)
            if not data:
                user_serializer = user_data.get_user_serializer(
                    request.user, recent_tweets_field)
                self.store_to_cache(user_serializer.data,
                                    user_email=request.user.email)
            else:
                cache_data = data

        elif force_update.lower() == "true":
            user = user_data.get_user_by_email(request.user.email)
            User.objects.update_recent_tweets(user)
            user_serializer = user_data.get_user_serializer(
                request.user, recent_tweets_field)
            self.store_to_cache(user_serializer.data, request.user.email)

        else:
            error = self.get_error_response("Invalid query")
            return JsonResponse(error, status=HTTPStatus.BAD_REQUEST)

        if not cache_data:
            return JsonResponse(user_serializer.data, status=HTTPStatus.OK.value)

        else:
            return JsonResponse(cache_data, status=HTTPStatus.OK.value)
