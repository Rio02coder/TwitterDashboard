from core.ml_model.predict import FluPredictor
from core.Twitter_api.Twitter_id import get_twitter_user_id
from core.Twitter_api.Tweets import get_recent_tweets

class FluPrediction:

    def  __init__(self):
        self.predictor = FluPredictor()

    def _get_user_id(self, username):
        return get_twitter_user_id(username)

    def _get_recent_tweets_of_user(self, username):
        user_id = self._get_user_id(username)
        return get_recent_tweets(user_id)
    
    def _get_prediction(self, tweets):
        if len(tweets) == 0:
            return (0.0, 0.0)
        return self.predictor.predict(tweets)

    def get_prediction_from_tweets(self, tweets):
        return self._get_prediction(tweets)

    def get_prediction_from_user_name(self, username):
        recent_tweets = self._get_recent_tweets_of_user(username)
        return self._get_prediction(recent_tweets)