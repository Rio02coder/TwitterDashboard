from django.http import JsonResponse
from rest_framework.views import APIView
from core.models.user_model import User
from rest_framework.parsers import JSONParser
from core.cache import user_flu_search_cache
from core.serializers.dynamic_serializers import UserSerializer
from core.Twitter_api.Twitter_id import get_twitter_user_id
from core.Twitter_api.Tweets import get_recent_tweets
from core.flu_prediction.prediction import FluPrediction
from http import HTTPStatus


class UserFluSearchView(APIView):

    http_method_names = ['post']

    def get_user_serializer(self, user, fields):
        return UserSerializer(user, fields=fields)

    def get_user(self, email):
        return User.objects.filter(email=email)[0]

    def is_user_verified(self, email):
        user = self.get_user(email)
        if not user.is_verified:
            raise PermissionError

    def get_error_string(self, error):
        return {
            "error": error
        }

    def get_prediction_string(self, prediction):
        return {
            "prediction": prediction
        }

    def get_twitter_name_error(self):
        return self.get_error_string("Wrong twitter name")

    def get_user_using_twitter_name(self, twitter_name):
        users = User.objects.filter(twitter_name=twitter_name)
        if len(users) == 0:
            return None
        return users[0]

    def get_cache_data(self, twitter_name):
        return user_flu_search_cache.get_from_cache(twitter_name)

    def set_cache_data(self, twitter_name, data):
        user_flu_search_cache.set_to_cache(twitter_name, data, timeout=10000)

    def post(self, request):
        try:
            self.is_user_verified(request.user)
        except:
            return JsonResponse(self.get_error_string("User is unverified"), status=HTTPStatus.BAD_REQUEST.value)
        request_data = JSONParser().parse(request)

        if not 'twitter_name' in request_data:
            return JsonResponse(self.get_error_string('Missing twitter name'), status=HTTPStatus.BAD_REQUEST.value)

        twitter_name = request_data['twitter_name']
        if not twitter_name:
            return JsonResponse(self.get_error_string('Missing twitter name'), status=HTTPStatus.BAD_REQUEST.value)
        # Check cache
        cache_data = self.get_cache_data(twitter_name)

        if not cache_data:
            # Check the database for the user
            user = self.get_user_using_twitter_name(twitter_name)
            if not user:
                # retrieve new data
                predictor = FluPrediction()
                recent_pred = predictor.get_prediction_from_user_name(
                    twitter_name)
                flu_recent_pred = recent_pred[1]
                # Save to cache
                self.set_cache_data(twitter_name, flu_recent_pred)
                return JsonResponse(self.get_prediction_string(flu_recent_pred), status=HTTPStatus.OK.value)

            else:
                prediction = user.get_recent_prediction()
                self.set_cache_data(twitter_name, prediction)

            return JsonResponse(self.get_prediction_string(prediction), status=HTTPStatus.OK.value)
        return JsonResponse(self.get_prediction_string(cache_data), status=HTTPStatus.OK.value)
