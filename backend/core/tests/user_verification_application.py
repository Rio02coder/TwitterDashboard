from django.test import TestCase
from django.urls import reverse
from core.models import User
from core.cache import user_flu_search_cache
from core.models import Application
from http import HTTPStatus
import json
import time


class UserVerificationApplication(TestCase):
    def _create_user(self):
        return User.objects.create(
            email='nikias@gmail.com', password='NikiasMolina@1234', twitter_name="NikiasMolina", is_verified=False)

    def setUp(self):
        try:
            self.user = self._create_user()
        except:
            print("We need to wait til we bypass the rate limiting time of twitter")
            time.sleep(800)
            self.user = self._create_user()
        self.login_url = reverse('user_login')
        self.verification_application_url = reverse('user_flu_application')

    def _login_user(self):
        login_data = {
            'email': self.user.email,
            'password': 'NikiasMolina@1234'
        }
        response = self.client.post(self.login_url, json.dumps(
            login_data), content_type='application/json')
        response_data = json.loads(response.content)
        return response_data['token']

    def test_succesful_application(self):
        token = self._login_user()
        access = token['access']
        headers = {'HTTP_AUTHORIZATION': f'Bearer {access}'}
        request_data = {'application': 'User application'}
        before_count = Application.objects.all().count()
        response = self.client.post(self.verification_application_url, json.dumps(
            request_data), content_type='application/json', **headers)
        after_count = Application.objects.all().count()
        self.assertEqual(before_count + 1, after_count)
        self.assertEqual(response.status_code, HTTPStatus.CREATED.value)

    def test_empty_application(self):
        token = self._login_user()
        access = token['access']
        headers = {'HTTP_AUTHORIZATION': f'Bearer {access}'}
        request_data = {'application': ''}
        response = self.client.post(self.verification_application_url, json.dumps(
            request_data), content_type='application/json', **headers)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_no_application(self):
        token = self._login_user()
        access = token['access']
        headers = {'HTTP_AUTHORIZATION': f'Bearer {access}'}
        request_data = {'something': 'somevalue'}
        response = self.client.post(self.verification_application_url, json.dumps(
            request_data), content_type='application/json', **headers)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_verified_application(self):
        self.user.is_verified = True
        self.user.save()
        token = self._login_user()
        access = token['access']
        headers = {'HTTP_AUTHORIZATION': f'Bearer {access}'}
        request_data = {'application': 'User application'}
        response = self.client.post(self.verification_application_url, json.dumps(
            request_data), content_type='application/json', **headers)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
