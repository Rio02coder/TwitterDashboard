from django.test import TestCase, override_settings
from django.urls import reverse
from django.conf import settings
from core.models import User
from core.authentication import TokenHandler
from http import HTTPStatus
import json
import time


class TokenRefreshTest(TestCase, TokenHandler):
    def _create_user(self):
        return User.objects.create(
            email='nikias@gmail.com', password='NikiasMolina@1234', twitter_name="NikiasMolina")

    def setUp(self):
        try:
            self.user = self._create_user()
        except:
            print("We need to wait til we bypass the rate limiting time of twitter")
            time.sleep(800)
            self.user = self._create_user()
        self.login_url = reverse('user_login')
        self.refresh_token_url = reverse('refresh_token')

    def _login_user(self):
        login_data = {
            'email': self.user.email,
            'password': 'NikiasMolina@1234'
        }
        response = self.client.post(self.login_url, json.dumps(
            login_data), content_type='application/json')
        response_data = json.loads(response.content)
        return response_data['token']

    def test_successful_refresh_token(self):
        token = self._login_user()
        access_token = token['access']
        refresh_token = token['refresh']
        token_string = {'token': refresh_token}
        headers = {'HTTP_AUTHORIZATION': f'Bearer {access_token}'}
        token_refresh_response = self.client.post(self.refresh_token_url, json.dumps(
            token_string), content_type='application/json', **headers)
        self.assertEqual(token_refresh_response.status_code,
                         HTTPStatus.CREATED.value)
        headers = {'HTTP_AUTHORIZATION': 'Bearer BADACCESSTOKEN'}
        token_refresh_response = self.client.post(self.refresh_token_url, json.dumps(
            token_string), content_type='application/json', **headers)
        self.assertEqual(token_refresh_response.status_code,
                         HTTPStatus.UNAUTHORIZED.value)

    def test_invalid_refresh_token(self):
        self._login_user()
        token_obj = self.retrieve_refresh_token(self.user)
        token_obj.used = True
        token_obj.save()
        token_string = {'token': token_obj.key}
        token_refresh_response = self.client.post(self.refresh_token_url, json.dumps(
            token_string), content_type='application/json')
        self.assertEqual(token_refresh_response.status_code,
                         HTTPStatus.UNAUTHORIZED.value)

    @override_settings(REFRESH_TOKEN_EXPIRY_TIME=1)
    def test_expired_refresh_token(self):
        self._login_user()
        token_obj = self.retrieve_refresh_token(self.user)
        time.sleep(settings.REFRESH_TOKEN_EXPIRY_TIME + 1)
        token_string = {
            'token': f'Bearer {token_obj.key}'
        }
        token_refresh_response = self.client.post(self.refresh_token_url, json.dumps(
            token_string), content_type='application/json')
        self.assertEqual(token_refresh_response.status_code,
                         HTTPStatus.UNAUTHORIZED.value)
