from dotenv import load_dotenv
import tweepy
import os

load_dotenv()

# Api registration

consumer_key = os.getenv('TWITTER_API_KEY')
consumer_secret = os.getenv('TWITTER_API_KEY_SECRET')
bearer_token = os.getenv('TWITTER_BEARER_TOKEN')
access_token = os.getenv('TWITTER_ACCESS_TOKEN')
access_token_secret = os.getenv('TWITTER_ACCESS_TOKEN_SECRET')

p_consumer_key = os.getenv('TWITTER_P_API_KEY')
p_consumer_secret = os.getenv('TWITTER_P_API_KEY_SECRET')
p_bearer_token = os.getenv('TWITTER_P_BEARER_TOKEN')
p_access_token = os.getenv('TWITTER_P_ACCESS_TOKEN')
p_access_token_secret = os.getenv('TWITTER_P_ACCESS_TOKEN_SECRET')


def get_client(use_personal_token=False):
    if use_personal_token:
        twitter_client = tweepy.Client(
            consumer_key=p_consumer_key,
            consumer_secret=p_consumer_secret,
            bearer_token=p_bearer_token,
            access_token=p_access_token,
            access_token_secret=p_access_token_secret
        )
    else:
        twitter_client = tweepy.Client(
            consumer_key=consumer_key,
            consumer_secret=consumer_secret,
            bearer_token=bearer_token,
            access_token=access_token,
            access_token_secret=access_token_secret)

    return twitter_client


client = get_client()
p_client = get_client(True)