from django.http import JsonResponse
from django.conf import settings
from django.utils import timezone

from rest_framework.authtoken.models import Token

from core.models.user_model import User
from core.models.token_model import RefreshToken
from core.helpers.customs.custom_exceptions import ExpiredTokenError
from core.serializers.dynamic_serializers.user_serializer import UserSerializer

from http import HTTPStatus

from datetime import datetime, timedelta

from typing import Tuple


class TokenHandler:

    # Erkebulan Duisebay (2018) Django Rest Framework DRF token authentication with expires in (Version unknown) [
    # Source code]. https://medium.com/@yerkebulan199/django-rest-framework-drf-token-authentication-with-expires-in
    # -a05c1d2b7e05

    def expires_in(self, object, expiry_time: float):
        time_elapsed: datetime = timezone.now() - object.created
        left_time: datetime = timedelta(seconds=expiry_time) - time_elapsed
        return left_time

    def is_expired(self, object, expiry_time: float):
        return self.expires_in(object, expiry_time) < timedelta(seconds=0)

    # If token has expired new token will be established.
    # If token has expired then it will be removed
    # and new one with different key will be created.
    def token_expire_handler(self, token: Token, expiry_time: float):
        has_expired: bool = self.is_expired(token, expiry_time)
        if has_expired:
            token.delete()
            token: Token = Token.objects.create(user=token.user)
        return has_expired, token

    def regenerate_auth_token(self, user: User):
        Token.objects.filter(user=user).delete()
        Token.objects.create(user=user)

    def retrieve_access_token(self, user: User):
        try:
            token: Token = Token.objects.get(user=user)

            if self.is_expired(token, settings.ACCESS_TOKEN_EXPIRY_TIME):
                token.delete()
                raise ExpiredTokenError

            return token
        except:
            return Token.objects.create(user=user)

    def retrieve_refresh_token(self, user: User):
        tokens: list[RefreshToken] = list(
            RefreshToken.objects.filter(user=user).order_by('-created'))

        if len(tokens) == 0 or self.is_expired(tokens[0], settings.REFRESH_TOKEN_EXPIRY_TIME):
            return RefreshToken.objects.create(user=user)

        return tokens[0]

    def get_auth_token_response(self, user: User, http_status: HTTPStatus = HTTPStatus.OK):
        user_token: Token = self.retrieve_access_token(user)
        refresh_token: RefreshToken = self.retrieve_refresh_token(user)
        serializer = UserSerializer(user)

        token_response = {
            "token": {
                "access": user_token.key,
                "refresh": refresh_token.key,
                "expires_in": self.expires_in(user_token, settings.ACCESS_TOKEN_EXPIRY_TIME).total_seconds()
            },
            "user": serializer.data
        }
        return JsonResponse(token_response, status=http_status.value)

    def delete_user_tokens(self, user: User) -> None:
        Token.objects.filter(user=user).delete()
        RefreshToken.objects.filter(user=user).delete()


# Exposing a singleton
token_handler = TokenHandler()
