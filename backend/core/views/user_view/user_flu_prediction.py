from django.http import JsonResponse
from rest_framework.views import APIView
from core.models.user_model import User
from core.cache.singleton_caches import user_last_month_flu_prediction_cache, user_recent_flu_prediction_cache

from http import HTTPStatus


class UserFluPrediction(APIView):
    http_method_names = ['get']

    def get_user(self, user_email):
        return User.objects.filter(email=user_email)[0]

    def get_recent_tweets(self, user):
        recent_tweets = []
        for tweet in user.recent_tweets.all():
            recent_tweets.append(tweet.text)
        return recent_tweets

    def get_last_month_tweets(self, user):
        last_month_tweets = []
        for tweet in user.last_month_tweets.all():
            last_month_tweets.append(tweet.text)
        return last_month_tweets

    def get_data_from_cache(self, user_email):
        last_month_pred = user_last_month_flu_prediction_cache.get_from_cache(
            user_email)
        recent_pred = user_recent_flu_prediction_cache.get_from_cache(
            user_email)
        return last_month_pred, recent_pred

    def set_data_to_cache(self, user_email, last_month_prediction, recent_prediction):
        user_last_month_flu_prediction_cache.set_to_cache(
            user_email, last_month_prediction)
        user_recent_flu_prediction_cache.set_to_cache(
            user_email, recent_prediction)

    def get_json_to_return(self, last_month_prediction, recent_prediction):
        return {
            "last_month_prediction": last_month_prediction,
            "recent_prediction": recent_prediction
        }

    def get(self, request):
        user: User = self.get_user(request.user)
        last_month_pred, recent_pred = self.get_data_from_cache(user.email)

        if last_month_pred is None:
            print("In last month refetching")
            User.objects.update_last_month_tweets(user)
            last_month_tweets = self.get_last_month_tweets(user)
            last_month_pred = user.get_last_month_prediction(last_month_tweets)

        if recent_pred is None:
            print("In recent refetching")
            recent_tweets = self.get_recent_tweets(user)
            recent_pred = user.get_recent_prediction(recent_tweets)

        self.set_data_to_cache(user.email, last_month_pred, recent_pred)

        json_to_return = self.get_json_to_return(last_month_pred, recent_pred)

        return JsonResponse(json_to_return, status=HTTPStatus.OK.value)
