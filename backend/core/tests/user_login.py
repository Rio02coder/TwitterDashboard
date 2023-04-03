from django.test import TestCase
from core.models import User
from django.urls import reverse
from http import HTTPStatus
import json
import time


class UserLoginTests(TestCase):
    def setUp(self):
        try:
            self.user = User.objects.create(
                email='nikias@gmail.com', password='NikiasMolina@1234', twitter_name="NikiasMolina")
        except:
            print("The API rate limiting has created an issue.")
            print("The code will pause for 800 seconds and again refresh.")
            time.sleep(800)
            self.user = User.objects.create(
                email='nikias@gmail.com', password='NikiasMolina@1234', twitter_name="NikiasMolina")
        self.url = reverse('user_login')

    def test_successful_login(self):
        correct_login_data = {'email': 'nikias@gmail.com',
                              'password': 'NikiasMolina@1234'}
        response = self.client.post(self.url, json.dumps(
            correct_login_data), content_type='application/json')
        self.assertEqual(response.status_code, HTTPStatus.OK.value)
        json_response = json.loads(response.content)
        self.assertNotEqual(json_response['token'], None)

    def test_unsuccessful_login(self):
        incorrect_login_data = {'email': 'nikias@gmail.com',
                                'password': 'BADPASSWORD@1234'}
        response = self.client.post(self.url, json.dumps(
            incorrect_login_data), content_type='application/json')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED.value)
