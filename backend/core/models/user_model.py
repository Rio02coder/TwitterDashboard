from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator, MinLengthValidator
from django.utils.translation import gettext_lazy as _
from typing import Union
from core.Twitter_api.Twitter_id import get_twitter_user_id
from core.Twitter_api.Tweets import get_recent_tweets, get_last_month_tweets
from core.models.tweet_model import Tweet
from core.models.application_model import Application
from core.Twitter_api.Month_date_time import get_current_month_number
from core.models.prediction_model import Prediction
from django.db.models.signals import post_delete
from django.dispatch import receiver
from core.cache import cache
from core.cache.singleton_caches import user_last_month_flu_prediction_cache, user_recent_flu_prediction_cache
from core.flu_prediction.prediction import FluPrediction


class UserManager(BaseUserManager):

    use_in_migrations = True

    def _create_user(self, email: str, password: str, twitter_name: str, **extra_fields):
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
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        user = self._create_user(email, password, twitter_name, **extra_fields)
        self.add_recent_tweets(user)
        self.add_last_month_tweets(user)
        return user

    def create_superuser(self, email: str, password: str, twitter_name: str, **extra_fields):
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
        user_recent_flu_prediction_cache.delete_from_cache(user.email)

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
            user_last_month_flu_prediction_cache.delete_from_cache(user.email)
        else:
            print("Fetching is not required")
            return

    def create(self, email: str, password: Union[str, None], twitter_name: str, **extra_fields):
        user = self.create_user(email, password, twitter_name, **extra_fields)
        return user


class User(AbstractBaseUser, PermissionsMixin):

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
    email: str = models.EmailField(
        _('Email address'), blank=False, unique=True)
    twitter_id = models.BigIntegerField(
        _('Twitter id'), blank=False, unique=True)
    twitter_name = models.CharField(
        _('Twitter username'), max_length=1000, blank=False, unique=True)
    recent_tweets = models.ManyToManyField(
        Tweet, related_name="_Recent_Tweets", blank=True)
    last_month_tweets = models.ManyToManyField(
        Tweet, related_name="_Last_Month_Tweets", blank=True)
    last_fetched_month = models.IntegerField(
        _('Last month to be fetched'), blank=False, default=0)
    recent_prediction = models.OneToOneField(Prediction, on_delete=models.CASCADE, blank=True,
                                             related_name="Recent prediction+", null=True)
    last_month_prediction = models.OneToOneField(Prediction, on_delete=models.CASCADE, blank=True,
                                                 related_name="Last month prediction+", null=True)
    flu_application = models.OneToOneField(
        Application, on_delete=models.SET_NULL, blank=True, null=True, related_name='Flu application+')
    is_verified: bool = models.BooleanField(default=False)
    is_active: bool = models.BooleanField(default=True)
    is_staff: bool = models.BooleanField(default=False)
    is_superuser: bool = models.BooleanField(default=False)

    objects: UserManager = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['twitter_name']

    def get_full_name(self):
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

    def _check_recent_prediction(self):
        try:
            print("In recent pred")
            self._report_missing_recent_prediction()
            if self.re_compute_recent_prediction():
                print("Recent re compute")
                raise ValueError
        except Exception as e:
            raise e

    def _check_last_month_prediction(self):
        try:
            print("In last month pred")
            self._report_missing_last_month_prediction()
            if self.re_compute_last_month_prediction():
                print("Last month re compute")
                raise ValueError
        except Exception as e:
            raise e

    def _get_recent_tweets_of_user(self):
        # user = User.objects.filter(email=self.email)[0]
        recent_tweets = []
        for tweet in self.recent_tweets:
            recent_tweets.append(tweet.text)
        return recent_tweets

    def _get_last_month_tweets_of_user(self):
        # user = User.objects.filter(email=self.email)[0]
        last_month_tweets = []
        for tweet in self.last_month_tweets:
            last_month_tweets.append(tweet.text)
        return last_month_tweets

    def _create_prediction(self, prediction):
        return Prediction.objects.create(prediction=prediction)

    def _save_last_month_prediction(self, prediction):
        self.last_month_prediction = self._create_prediction(prediction)
        self.save()

    def _save_recent_prediction(self, prediction):
        self.recent_prediction = self._create_prediction(prediction)
        self.save()

    def _update_recent_prediction(self, recent_prediction):
        recent_prediction_object = self._get_recent_prediction_object()
        recent_prediction_object.prediction = recent_prediction
        recent_prediction_object.requires_re_computation = False
        recent_prediction_object.save()

    def _update_last_month_prediction(self, last_month_prediction):
        last_month_prediction_object = self._get_last_month_prediction_object()
        last_month_prediction_object.prediction = last_month_prediction
        last_month_prediction_object.requires_re_computation = False
        last_month_prediction_object.save()

    def _get_last_month_prediction_number(self):
        flu_prediction = FluPrediction()
        last_month_tweets = self._get_last_month_tweets_of_user()
        prediction = flu_prediction.get_prediction_from_tweets(
            last_month_tweets)
        return prediction[1]

    def _get_recent_prediction_number(self):
        flu_prediction = FluPrediction()
        recent_tweets = self._get_recent_tweets_of_user()
        prediction = flu_prediction.get_prediction_from_tweets(recent_tweets)
        return prediction[1]

    def _get_prediction_number(self, tweets):
        flu_prediction = FluPrediction()
        prediction = flu_prediction.get_prediction_from_tweets(tweets)
        return prediction[1]

    def get_recent_prediction(self, tweets):
        """This method returns the prediction of the recent tweets.
        This assumes that the recent tweets are updated."""
        try:
            self._check_recent_prediction()
            recent_prediction = self._get_recent_prediction_object()
            return recent_prediction.prediction
        except AttributeError:
            print("Creating Prediction recent")
            prediction = self._get_prediction_number(tweets)
            self._save_recent_prediction(prediction)
            return prediction
        except ValueError:
            print("Recomputing recent")
            prediction = self._get_prediction_number(tweets)
            self._update_recent_prediction(prediction)
            return prediction

    def get_last_month_prediction(self, tweets):
        """This method returns the last month prediction. This will assume
        that the last month tweets are updated."""
        try:
            self._check_last_month_prediction()
            last_month_prediction = self._get_last_month_prediction_object()
            return last_month_prediction.prediction
        except AttributeError:
            print("Creating prediction lm")
            prediction = self._get_prediction_number(tweets)
            self._save_last_month_prediction(prediction)
            return prediction
        except ValueError:
            print("Recomputing lm")
            prediction = self._get_prediction_number(tweets)
            self._update_last_month_prediction(prediction)
            return prediction

# Signals


@receiver(post_delete, sender=User)
def delete_user_cache(sender, instance, using, **kwargs):
    cache.delete_cache_patterns(instance.email)
