from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator, MinLengthValidator
from django.utils.translation import gettext_lazy as _
from typing import Union
from core.Twitter_api.Twitter_id import get_twitter_user_id
from core.Twitter_api.Tweets import get_recent_tweets, get_last_month_tweets
from core.models.tweet_model import Tweet


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

    def create_tweets_database(self, fetched_tweets):
        user_tweets = []
        for tweet in fetched_tweets:
            user_tweet = Tweet.objects.create(text=tweet)
            user_tweets.append(user_tweet)
        return user_tweets

    def add_tweets_to_user(self, fetched_tweets, user):
        user_tweets = self.create_tweets_database(fetched_tweets)

        for user_tweet in user_tweets:
            user.recent_tweets.add(user_tweet)

    def fetch_tweets(self, email):
        twitter_id = User.objects.filter(email=email)[0].twitter_id
        try:
            return get_recent_tweets(twitter_id)
        except Exception as e:
            raise e

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

    def add_recent_tweets(self, user):
        fetched_tweets = self.fetch_tweets(user.email)
        self.add_tweets_to_user(fetched_tweets, user)

    def update_recent_tweets(self, user):
        user.recent_tweets.all().delete()
        self.add_recent_tweets(user)

    def create(self, email: str, password: Union[str, None], twitter_name: str, **extra_fields):
        user = self.create_user(email, password, twitter_name, **extra_fields)
        # Get recent tweets and add it to the user
        self.add_recent_tweets(user)
        return user


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
    recent_tweets = models.ManyToManyField(Tweet, related_name="_Recent_Tweets", blank=True)
    last_month_tweets = models.ManyToManyField(Tweet, related_name="_Last_Month_Tweets", blank=True)
    last_fetched_month = models.IntegerField(_('Last month to be fetched'), blank=False, default=0)
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
