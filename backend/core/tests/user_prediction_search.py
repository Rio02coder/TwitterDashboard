from django.test import TestCase
from django.urls import reverse
from core.models import User
from core.cache import user_flu_search_cache
from http import HTTPStatus
import json
import time


class UserPredictionSearchTest(TestCase):
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
        self.flu_prediction_search_url = reverse('user_flu_search')

    def _login_user(self):
        login_data = {
            'email': self.user.email,
            'password': 'NikiasMolina@1234'
        }
        response = self.client.post(self.login_url, json.dumps(
            login_data), content_type='application/json')
        response_data = json.loads(response.content)
        return response_data['token']

    def test_user_prediction(self):
        token = self._login_user()
        access = token['access']
        headers = {'HTTP_AUTHORIZATION': f'Bearer {access}'}
        request_data = {'twitter_name': 'elonmusk'}
        response = self.client.post(self.flu_prediction_search_url, json.dumps(
            request_data), content_type='application/json', **headers)
        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        cache_response = user_flu_search_cache.get_from_cache('elonmusk')
        self.assertNotEqual(cache_response, None)

        self.assertEqual(json.loads(
            response.content)['prediction'], cache_response)

    def test_no_prediction_search_request(self):
        token = self._login_user()
        access = token['access']
        headers = {'HTTP_AUTHORIZATION': f'Bearer {access}'}
        request_data = {'something': 'somevalue'}
        response = self.client.post(self.flu_prediction_search_url, json.dumps(
            request_data), content_type='application/json', **headers)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_empty_prediction_search_request(self):
        token = self._login_user()
        access = token['access']
        headers = {'HTTP_AUTHORIZATION': f'Bearer {access}'}
        request_data = {'twitter_name': ''}
        response = self.client.post(self.flu_prediction_search_url, json.dumps(
            request_data), content_type='application/json', **headers)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)

    def test_unverified_request(self):
        self.user.is_verified = False
        self.user.save()
        token = self._login_user()
        access = token['access']
        headers = {'HTTP_AUTHORIZATION': f'Bearer {access}'}
        request_data = {'twitter_name': 'elonmusk'}
        response = self.client.post(self.flu_prediction_search_url, json.dumps(
            request_data), content_type='application/json', **headers)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
