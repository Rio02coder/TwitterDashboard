from django.http import JsonResponse
from rest_framework.views import APIView
from core.models.user_model import User
from core.utilities.user_data import user_data
from http import HTTPStatus


class UserProfileView(APIView):

    http_method_names = ['get']

    def update_user_last_month_tweets(self, user_email):
        user = user_data.get_user_by_email(user_email)
        User.objects.update_last_month_tweets(user)

    def get(self, request):
        self.update_user_last_month_tweets(request.user.email)
        user_serializer = user_data.get_user_serializer(user=request.user)
        return JsonResponse(user_serializer.data, status=HTTPStatus.OK.value)
