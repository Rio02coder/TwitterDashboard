from django.test import TestCase
from core.models import User
from django.urls import reverse
from http import HTTPStatus
import json
import time


class UserLogoutTests(TestCase):
    def _create_user(self):
        return User.objects.create(
            email='nikias@gmail.com', password='NikiasMolina@1234', twitter_name="NikiasMolina", is_verified=True)

    def setUp(self):
        try:
            self.user = self._create_user()
        except:
            print("We need to wait til we bypass the rate limiting time of twitter")
            time.sleep(800)
            self.user = self._create_user()
        self.login_url = reverse('user_login')
        self.logout_url = reverse('user_logout')

    def _login_user(self):
        login_data = {
            'email': self.user.email,
            'password': 'NikiasMolina@1234'
        }
        response = self.client.post(self.login_url, json.dumps(
            login_data), content_type='application/json')
        response_data = json.loads(response.content)
        return response_data['token']

    def test_user_logout_without_auth(self):
        self._login_user()
        response = self.client.get(self.logout_url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)

    def test_user_logout(self):
        token = self._login_user()
        access = token['access']
        headers = {'HTTP_AUTHORIZATION': f'Bearer {access}'}
        response = self.client.get(self.logout_url, **headers)
        self.assertEqual(response.status_code, HTTPStatus.OK.value)
