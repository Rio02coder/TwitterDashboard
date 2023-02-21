from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from core.models.user_model import User
from core.serializers.dynamic_serializers import UserSerializer
from core.helpers.customs.custom_response_generator import response_generator
from core.authentication.tokens.token_handler import token_handler

from http import HTTPStatus

from typing import Any, Dict

class SignUpView(APIView):

    authentication_classes = []
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def get_user_token(self, email: str):
        user: User = User.objects.get(email=email)
        return token_handler.get_auth_token_response(user, http_status=HTTPStatus.CREATED)

    def post(self, request) -> HttpResponse:
        request_data: Dict[str, Any] = JSONParser().parse(request)
        serializer: UserSerializer = UserSerializer(data=request_data)
        if not "email" in request_data:
            return response_generator.generate_error_response(HTTPStatus.BAD_REQUEST,
                                                              error_message="User cannot sign up without an email.")

        if not "twitter_name" in request_data:
            return response_generator.generate_error_response(HTTPStatus.BAD_REQUEST,
                                                              error_message="User cannot sign up without twitter name")

        if User.objects.filter(email=request_data['email']).exists():
            return response_generator.generate_error_response(HTTPStatus.CONFLICT,
                                                              error_message="User with that email already exists.")

        if User.objects.filter(email=request_data['twitter_name']).exists():
            return response_generator.generate_error_response(HTTPStatus.CONFLICT,
                                                              error_message="User with that twitter name already exists.")

        if serializer.is_valid():
            serializer.save()
            response = self.get_user_token(email=request_data['email'])
            return response

        return JsonResponse(serializer.errors, status=HTTPStatus.BAD_REQUEST.value)
