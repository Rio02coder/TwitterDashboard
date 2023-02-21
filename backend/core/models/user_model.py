from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator, MinLengthValidator
from django.utils.translation import gettext_lazy as _
from typing import Union
from core.Twitter_api.Twitter_id import get_twitter_user_id


class UserManager(BaseUserManager):
    """
        User Manager Model
    """

    use_in_migrations = True

    def _create_user(self, email: str, password: str, twitter_name: str, **extra_fields):
        """Create and save a User with the given email, password and Twitter username."""

        if not email:
            raise ValueError('The user must provide an email!')
        email = self.normalize_email(email)
        twitter_id = get_twitter_user_id(twitter_name)
        user = self.model(
            email=email, twitter_name=twitter_name, twitter_id=twitter_id, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_user(self, email: str, password: Union[str, None], twitter_name: str, **extra_fields):
        """Create and save a regular user with the email, password and twitter name"""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, twitter_name, **extra_fields)

    def create_superuser(self, email: str, password: str, twitter_name: str, **extra_fields):
        """Create and save a SuperUser with the given email, password and twitter name."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff = True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser = True.")

        return self._create_user(email, password, twitter_name, **extra_fields)

    def create(self, email: str, password: Union[str, None], twitter_name: str, **extra_fields):
        return self.create_user(email, password, twitter_name, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
        Model used to store information about the user.
    """
    first_name: str = models.CharField(
        _('First name'),
        max_length=1000,
        blank=False,
        validators=[
            RegexValidator(
                regex=r'^[-a-zA-Z]+$',
                message="Your first name must contain only letters!"
            )
        ],
    )
    last_name: str = models.CharField(
        _('Last name'),
        max_length=1000,
        blank=False,
        validators=[
            RegexValidator(
                regex=r'^[-a-zA-Z]+$',
                message="Your last name must contain only letters!"
            )
        ],
    )
    email: str = models.EmailField(_('Email address'), blank=False, unique=True)
    twitter_id = models.BigIntegerField(_('Twitter id'), blank=False, unique=True)
    twitter_name = models.CharField(_('Twitter username'), max_length=1000, blank=False, unique=True)
    is_verified: bool = models.BooleanField(default=False)
    is_active: bool = models.BooleanField(default=True)
    is_staff: bool = models.BooleanField(default=False)
    is_superuser: bool = models.BooleanField(default=False)

    objects: UserManager = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self) -> str:
        """Return the full name of the user."""
        return f'{self.first_name} {self.last_name}'