from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from core.utilities.user_data import user_data
from core.serializers.model_serializers import FluApplicationSerializer
from core.models.application_model import Application
from http import HTTPStatus


class FluApplicationView(APIView):
    http_method_names = ['post']

    def get_error(self, error_string):
        return {
            "error": error_string
        }

    def get_success(self, success_message):
        return {
            "success": success_message
        }

    def create_application(self, application_text):
        return Application.objects.create(flu_application=application_text)

    def save_application_to_user(self, application, user_email):
        user = user_data.get_user_by_email(user_email)
        user.flu_application = application
        user.save()

    def post(self, request):
        request_data = JSONParser().parse(request)
        application = request_data['application']
        if not application:
            return JsonResponse(self.get_error("Missing application"), status=HTTPStatus.BAD_REQUEST.value)
        flu_application = self.create_application(application)
        self.save_application_to_user(flu_application, request.user.email)
        application_serializer = FluApplicationSerializer(flu_application)
        return JsonResponse(application_serializer.data, status=HTTPStatus.CREATED.value)
