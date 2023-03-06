from rest_framework import serializers


class AuthSerializer(serializers.Serializer):
    """
        Serializer for authenticating the user.
    """
    # def __init__(self, *args, **kwargs):

    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
