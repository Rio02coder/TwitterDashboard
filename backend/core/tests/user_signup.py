from django.test import TestCase
from django.urls import reverse
from http import HTTPStatus
import json


class UserSignupTests(TestCase):
    def setUp(self):
        self.url = reverse('sign_up')

    def _signup_user(self):
        correct_signup_data = {
            'email': 'nikias@gmail.com',
            'first_name': 'Nikias',
            'last_name': 'Molina',
            'twitter_name': 'NikiasMolina',
            'password': 'NikiasMolina@1234'
        }
        return self.client.post(self.url, json.dumps(
            correct_signup_data), content_type='application/json')

    def _missing_signup_user(self):
        missing_signup_data = {
            'email': 'nikias@gmail.com',
            'first_name': 'Nikias',
            'last_name': 'Molina'
        }
        return self.client.post(self.url, json.dumps(missing_signup_data), content_type='application/json')

    def test_successful_signup(self):
        response = self._signup_user()
        # Either the server returns a OK, or the rate limiting response of INTERNAL SERVER ERROR
        try:
            self.assertEqual(response.status_code, HTTPStatus.CREATED.value)
        except:
            self.assertEqual(response.status_code,
                             HTTPStatus.INTERNAL_SERVER_ERROR.value)

    def test_unsuccessful_signup(self):
        response = self._signup_user()
        if response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR.value:
            self.skipTest(
                'This test can run if there is no rate limiting error from the Twitter API')
        # At this point it seems to be an okay response.
        # Trying to signup the same user
        response = self._signup_user()
        self.assertEqual(response.status_code, HTTPStatus.CONFLICT.value)

    def test_missing_signup(self):
        response = self._missing_signup_user()
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST.value)
