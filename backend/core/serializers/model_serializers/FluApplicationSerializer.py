from rest_framework import serializers
from core.models.application_model import Application


class FluApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application

        fields = "__all__"
