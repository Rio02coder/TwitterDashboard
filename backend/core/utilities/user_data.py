from core.models import User
from core.serializers.dynamic_serializers import UserSerializer


class UserData:

    def __init__(self):
        pass

    def get_user_by_email(self, email):
        return User.objects.filter(email=email)[0]

    def get_user_by_twitter_name(self, twitter_name):
        return User.objects.filter(twitter_name=twitter_name)[0]

    def get_user_serializer(self, user, fields):
        return UserSerializer(user, fields=fields)


user_data = UserData()
