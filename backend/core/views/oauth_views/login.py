from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import check_password
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser

from core.serializers.basic_serializers.AuthSerializer import AuthSerializer
from core.models.user_model import User
from core.authentication.tokens.token_handler import token_handler
from core.helpers.customs.custom_response_generator import response_generator

from http import HTTPStatus

from typing import Any, Dict


class UserAuthTokenView(APIView):
    """
        View for retrieving a user's auth token.
    """
    authentication_classes = []
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def get_error(self, error_string):
        return {
            "error": error_string
        }

    def post(self, request) -> HttpResponse:
        request_data: Dict[str, Any] = JSONParser().parse(request)
        serializer = AuthSerializer(data=request_data)

        if not serializer.is_valid():
            return JsonResponse(self.get_error("Email and password are required to login"), status=HTTPStatus.BAD_REQUEST.value)

        try:
            retrieved_user: User = User.objects.get(
                email=request_data['email'])
            if not check_password(request_data['password'], retrieved_user.password):
                return response_generator.generate_error_response(HTTPStatus.UNAUTHORIZED,
                                                                  **{'WWW-Authenticate': 'Bearer'})

            return token_handler.get_auth_token_response(retrieved_user)
        except ObjectDoesNotExist:
            return JsonResponse(self.get_error("No such user"), status=HTTPStatus.BAD_REQUEST.value)
