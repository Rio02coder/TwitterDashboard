from .api_registration import client, p_client
from .Month_date_time import get_last_month_date_time
MAX_RESULTS = 100
def get_tweet_text_list(tweets):
    tweet_text_list = []
    if not tweets:
        return tweet_text_list
    for tweet in tweets:
        tweet_text_list.append(tweet.text)
    return tweet_text_list

def bounded_search(twitter_id, start_time, end_time):
    try:
        return client.get_users_tweets(twitter_id, max_results=MAX_RESULTS, end_time=end_time, start_time=start_time).data
    except Exception as e:
        return e

def get_recent_tweets(twitter_id):
    try:
        tweets = client.get_users_tweets(twitter_id, max_results=MAX_RESULTS).data
        return get_tweet_text_list(tweets)
    except Exception as e:
        return e

def get_last_month_tweets(twitter_id):
    start_time, end_time = get_last_month_date_time()
    try:
        tweets = bounded_search(twitter_id, start_time, end_time)
        return get_tweet_text_list(tweets)
    except Exception as e:
        return e
