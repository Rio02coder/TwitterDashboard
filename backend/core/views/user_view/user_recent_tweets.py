from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from core.models.user_model import User
from core.serializers.dynamic_serializers import UserSerializer
from core.helpers.customs.custom_response_generator import response_generator

from http import HTTPStatus

from typing import Any, Dict

class RecentTweetsView(APIView):

    http_method_names = ['get']

    def get_user_serializer(self, user, fields):
        return UserSerializer(user, fields=fields)

    def get_user(self, email):
        return User.objects.filter(email=email)[0]

    def get(self, request, force_update="False"):
        recent_tweets_field = ['recent_tweets']
        user_serializer = None

        if force_update.lower() == "false":
            user_serializer = self.get_user_serializer(request.user, recent_tweets_field)

        else:
            user = self.get_user(request.user)
            user.update_recent_tweets()
            user_serializer = self.get_user_serializer(request.user, recent_tweets_field)

        return JsonResponse(user_serializer.data, status=HTTPStatus.OK.value)


