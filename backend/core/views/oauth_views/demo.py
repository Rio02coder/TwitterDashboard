from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from http import HTTPStatus

class DemoView(APIView):
    http_method_names = ['get']

    def get(self, request) -> JsonResponse:
        # Get all retrievable fields of the User model for the Personal Profile Page.
        response = {
            "text": "Just parsing some JSON."
        }
        return JsonResponse(response, status=HTTPStatus.OK.value)
