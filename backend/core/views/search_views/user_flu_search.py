from django.http import JsonResponse
from rest_framework.views import APIView
from core.models.user_model import User
from rest_framework.parsers import JSONParser
from core.cache import user_flu_search_cache
from core.serializers.dynamic_serializers import UserSerializer

from http import HTTPStatus


class UserFluSearchView(APIView):

    http_method_names = ['get']

    def get_user_serializer(self, user, fields):
        return UserSerializer(user, fields=fields)

    def get_user(self, email):
        return User.objects.filter(email=email)[0]

    def get_twitter_name_error(self):
        return {
            "error": "Wrong twitter name"
        }

    def get_user_using_twitter_name(self, twitter_name):
        users = User.objects.filter(twitter_name=twitter_name)
        if len(users):
            return None
        return users[0]

    def get_cache_data(self, twitter_name):
        return user_flu_search_cache.get_from_cache(twitter_name)

    def set_cache_data(self, twitter_name, data):
        user_flu_search_cache.set_to_cache(twitter_name, data, timeout=10000)

    def get(self, request):
        # user = self.get_user(request.user)
        request_data = JSONParser().parse(request)

        twitter_name = request_data['twitter_name']

        if not twitter_name:
            return JsonResponse(self.get_twitter_name_error(), HTTPStatus.BAD_REQUEST.value)

        # Check cache
        cache_data = self.get_cache_data(twitter_name)

        if not cache_data:
            # Check the database for the user
            user = self.get_user_using_twitter_name(twitter_name)
            if not user:
                # retrieve new data
                pass

            else:
                prediction = user.get_recent_prediction()
                self.set_cache_data(twitter_name, prediction)

            return JsonResponse()
