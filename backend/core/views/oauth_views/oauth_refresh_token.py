from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny

from core.models.user_model import User
from core.models.token_model import RefreshToken
from core.authentication.tokens.token_handler import token_handler
from core.helpers.customs.custom_response_generator import response_generator
from http import HTTPStatus

from typing import Any, Dict


class RefreshTokenView(APIView):
    http_method_names = ['post']
    authentication_classes = []
    permission_classes = (AllowAny,)

    def post(self, request) -> HttpResponse:
        request_data: Dict[str, Any] = JSONParser().parse(request)

        if not "token" in request_data:
            return response_generator.generate_error_response(HTTPStatus.BAD_REQUEST,
                                                              error_message="Refresh token missing.")

        try:
            refresh_token_objects = RefreshToken.objects.filter(key=request_data["token"])

            if refresh_token_objects.count() == 0:
                raise ObjectDoesNotExist

            refresh_token_object: RefreshToken = refresh_token_objects.first()
            retrieved_user: User = refresh_token_object.user

            if refresh_token_object.used:
                token_handler.delete_user_tokens(retrieved_user)
                return response_generator.generate_error_response(HTTPStatus.UNAUTHORIZED)

            if token_handler.is_expired(refresh_token_object, settings.REFRESH_TOKEN_EXPIRY_TIME):
                return response_generator.generate_error_response(HTTPStatus.UNAUTHORIZED)

            token_handler.regenerate_auth_token(retrieved_user)
            refresh_token_objects.update(used=True)
            RefreshToken.objects.create(user=retrieved_user)

            return token_handler.get_auth_token_response(retrieved_user, http_status=HTTPStatus.CREATED)

        except ObjectDoesNotExist:
            return response_generator.generate_error_response(HTTPStatus.UNAUTHORIZED)
