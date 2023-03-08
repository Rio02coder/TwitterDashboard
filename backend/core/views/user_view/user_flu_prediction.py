from django.http import JsonResponse
from rest_framework.views import APIView
from core.models.user_model import User
from core.cache import user_flu_prediction_cache

from http import HTTPStatus


class UserFluPrediction(APIView):
    http_method_names = ['get']

    def get_user(self, user_email):
        return User.objects.filter(email=user_email)[0]

    def get(self, request):
        user = self.get_user(request.user)
        print(user.last_fetched_month)
        User.objects.update_last_month_tweets(user)
        print(user.last_fetched_month)
        recent_prediction = user.get_recent_prediction()
        last_month_prediction = user.get_last_month_prediction()
        print(recent_prediction, last_month_prediction)
        data = {
            "data": "Trying out some JSON"
        }
        return JsonResponse(data, status=HTTPStatus.OK.value)
