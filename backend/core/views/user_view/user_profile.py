from django.http import JsonResponse
from rest_framework.views import APIView
from core.utilities.user_data import user_data
from http import HTTPStatus


class UserProfileView(APIView):

    http_method_names = ['get']

    def get(self, request):
        user_serializer = user_data.get_user_serializer(request.user)
        return JsonResponse(user_serializer.data, status=HTTPStatus.OK.value)
