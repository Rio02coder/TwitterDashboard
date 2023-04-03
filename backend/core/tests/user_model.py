from django.test import TestCase
from django.core.exceptions import ValidationError
from core.models import User
from core.models import RefreshToken
from rest_framework.authtoken.models import Token
from django.contrib.auth.password_validation import validate_password
# Create your tests here.


class UserTests(TestCase):
    fixtures = ['user.json']

    def setUp(self):
        self.user = User.objects.get(pk=1)

    def _get_another_user(self):
        return User.objects.get(pk=2)

    def _assert_user_in_invalid(self):
        with self.assertRaises(ValidationError):
            self.user.full_clean()

    def _assert_user_is_valid(self):
        try:
            self.user.full_clean
        except:
            self.fail('User should be fine')

    def _validate_password(self):
        try:
            validate_password(self.user.password)
        except:
            self.fail('Password should have been correct')

    def _invalid_password(self):
        with self.assertRaises(ValidationError):
            validate_password(self.user.password)

    def test_user_is_valid(self):
        self._assert_user_is_valid()

    def test_first_name_is_not_blank(self):
        self.user.first_name = ''
        self._assert_user_in_invalid()

    def test_first_name_max_limit(self):
        self.user.first_name = '*' * 1001
        self._assert_user_in_invalid()

    def test_first_name_cannot_contain_numbers(self):
        self.user.first_name = 'Rio02coder'
        self._assert_user_in_invalid()

    def test_last_name_is_not_blank(self):
        self.user.last_name = ''
        self._assert_user_in_invalid()

    def test_last_name_max_limit(self):
        self.user.last_name = '*' * 1001
        self._assert_user_in_invalid()

    def test_last_name_cannot_contain_numbers(self):
        self.user.last_name = 'Rio02coder'
        self._assert_user_in_invalid()

    def test_email_cannot_be_blank(self):
        self.user.email = ''
        self._assert_user_in_invalid()

    def test_email_has_asterisk(self):
        self.user.email = 'shmeelokgmail.com'
        self._assert_user_in_invalid()

    def test_email_has_domain_name(self):
        self.user.email = 'shmeelok@.com'
        self._assert_user_in_invalid()
        self.user.email = 'shmeelok@gmail'
        self._assert_user_in_invalid()

    def test_email_is_unqiue(self):
        self.user.email = self._get_another_user().email
        self._assert_user_in_invalid()
