from django.http import JsonResponse
from rest_framework.views import APIView
from core.models.user_model import User
from core.cache import user_flu_prediction_cache


class FluPrediction(APIView):
    http_method_names = ['get']

    def get(self):
        pass
