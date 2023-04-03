from django.test import TestCase
from core.models import User, Tweet


class UserManagerTests(TestCase):

    def _get_recent_tweet_count(self, user):
        all_tweets = Tweet.objects.all()
        recent_tweet_count = 0
        for tweet in all_tweets:
            count = user.recent_tweets.filter(id=tweet.id).count()
            if count == 1:
                recent_tweet_count += 1
        return recent_tweet_count

    def _get_last_month_tweet_count(self, user):
        all_tweets = Tweet.objects.all()
        last_month_tweet_count = 0
        for tweet in all_tweets:
            count = user.last_month_tweets.filter(id=tweet.id).count()
            if count == 1:
                last_month_tweet_count += 1
        return last_month_tweet_count

    def _get_recent_tweets(self, user):
        recent_tweets = []
        for tweet in user.recent_tweets.all():
            recent_tweets.append(tweet.text)
        return recent_tweets

    def _get_last_month_tweets(self, user):
        last_month_tweets = []
        for tweet in user.last_month_tweets.all():
            last_month_tweets.append(tweet.text)
        return last_month_tweets

    def test_user_creation_and_tweet_prediction(self):
        """Method to create the user and test their prediction.
        This method combines various features of the user model
        because, we do not want to call the twitter api multiple
        times as it can lead to rate limiting issues."""
        user = User.objects.create_user(
            email='nikias@gmail.com', password='NikiasMolina@1234', twitter_name="NikiasMolina")
        recent_tweet_count = self._get_recent_tweet_count(user)
        last_month_tweet_count = self._get_last_month_tweet_count(user)
        self.assertLessEqual(recent_tweet_count, 100)
        self.assertLessEqual(last_month_tweet_count, 100)
        print('#Checking Last fetched month is constant#')
        last_month = user.last_fetched_month
        User.objects.update_last_month_tweets(user)
        try:
            self.assertEqual(user.last_fetched_month, last_month)
        except:
            # This is a time dependent test. If the test is run close to 12 am and it would
            # be next month after 12 am, then the test would fail. So, the following piece
            # of code would finally check if the last fetched month is indeed equal after
            # the update.
            last_month = user.last_fetched_month
            User.objects.update_last_month_tweets(user)
            self.assertEqual(user.last_fetched_month, last_month)
        print('#Testing prediction')
        user.get_recent_prediction(self._get_recent_tweets(user))
        user.get_last_month_prediction(self._get_last_month_tweets(user))
        self.assertEqual(user.re_compute_recent_prediction(), False)
        self.assertEqual(user.re_compute_last_month_prediction(), False)
        print('#Testing prediction update')
        User.objects.update_recent_tweets(user)
        self.assertEqual(user.re_compute_recent_prediction(), True)
        user.get_recent_prediction(self._get_recent_tweets(user))
        self.assertEqual(user.re_compute_recent_prediction(), False)
