from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator, MinLengthValidator
from django.utils.translation import gettext_lazy as _
from typing import Union
from core.Twitter_api.Twitter_id import get_twitter_user_id
from core.Twitter_api.Tweets import get_recent_tweets, get_last_month_tweets
from core.models.tweet_model import Tweet
from core.Twitter_api.Month_date_time import get_current_month_number
from core.models.prediction_model import Prediction
from django.db.models.signals import post_delete
from django.dispatch import receiver
from core.cache import cache


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
        print(password)
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

    def add_last_month_tweets_to_user(self, fetched_tweets, user):
        user_tweets = self.create_tweets_database(fetched_tweets)
        for user_tweet in user_tweets:
            user.last_month_tweets.add(user_tweet)

    def fetch_tweets(self, email):
        twitter_id = User.objects.filter(email=email)[0].twitter_id
        try:
            return get_recent_tweets(twitter_id)
        except Exception as e:
            raise e

    def fetch_last_month_tweets(self, twitter_id):
        try:
            return get_last_month_tweets(twitter_id)
        except Exception as e:
            raise e

    def create_user(self, email: str, password: Union[str, None], twitter_name: str, **extra_fields):
        """Create and save a regular user with the email, password and twitter name"""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        user = self._create_user(email, password, twitter_name, **extra_fields)
        self.add_recent_tweets(user)
        self.add_last_month_tweets(user)
        return user

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
        user.update_recent_prediction_status(True)

    def add_last_month_tweets(self, user):
        current_month = get_current_month_number()
        last_month_tweets = self.fetch_last_month_tweets(user.twitter_id)
        self.add_last_month_tweets_to_user(last_month_tweets, user)
        last_month = 12 if current_month == 1 else current_month - 1
        user.last_fetched_month = last_month
        user.save()

    def update_last_month_tweets(self, user):
        current_month = get_current_month_number()
        last_month = 12 if current_month == 1 else current_month - 1
        last_fetched_month = user.last_fetched_month
        if last_fetched_month == 0:
            self.add_last_month_tweets(user)
        elif last_fetched_month < last_month:
            user.last_month_tweets.all().delete()
            self.add_last_month_tweets(user)
            user.update_last_month_prediction_status(True)
        else:
            return

    def create(self, email: str, password: Union[str, None], twitter_name: str, **extra_fields):
        user = self.create_user(email, password, twitter_name, **extra_fields)
        # Get recent tweets and add it to the user
        self.add_recent_tweets(user)
        self.add_last_month_tweets(user)
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
    recent_prediction = models.OneToOneField(Prediction, on_delete=models.CASCADE, blank=True,
                                             related_name="Recent prediction+", null=True)
    last_month_prediction = models.OneToOneField(Prediction, on_delete=models.CASCADE, blank=True,
                                                 related_name="Last month prediction+", null=True)
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

    def _get_last_month_prediction_object(self):
        pk = self.last_month_prediction.pk
        return Prediction.objects.get(pk=pk)

    def _get_recent_prediction_object(self):
        pk = self.recent_prediction.pk
        return Prediction.objects.get(pk=pk)

    def _get_re_computation_status(self, pk):
        prediction_object = Prediction.objects.get(pk=pk)
        return prediction_object.requires_re_computation

    def _report_missing_recent_prediction(self):
        if not self.last_month_prediction:
            raise AttributeError

    def _report_missing_last_month_prediction(self):
        if not self.recent_prediction:
            raise AttributeError

    def re_compute_recent_prediction(self):
        """Returns whether the recent tweets prediction requires re computation.
        In the case that it does not exist, it returns None."""
        try:
            self._report_missing_recent_prediction()
            pk = self.recent_prediction.pk
            return self._get_re_computation_status(pk)
        except:
            return None

    def re_compute_last_month_prediction(self):
        """Returns whether the recent tweets prediction requires re computation.
        In the case that it does not exist, it returns None."""
        try:
            self._report_missing_last_month_prediction()
            pk = self.last_month_prediction.pk
            return self._get_re_computation_status(pk)
        except:
            return None

    def update_last_month_prediction_status(self, status):
        try:
            self._report_missing_last_month_prediction()
            last_month_prediction = self._get_last_month_prediction_object()
            last_month_prediction.requires_re_computation = status
            last_month_prediction.save()
            return True
        except:
            return False

    def update_recent_prediction_status(self, status):
        try:
            self._report_missing_recent_prediction()
            recent_prediction = self._get_recent_prediction_object()
            recent_prediction.requires_re_computation = status
            recent_prediction.save()
            return True
        except:
            return False


# Signals


@receiver(post_delete, sender=User)
def delete_user_cache(sender, instance, using, **kwargs):
    cache.delete_cache_patterns(instance.email)
