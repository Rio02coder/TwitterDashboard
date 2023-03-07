from .cache import Cache


RECENT_TWEET_CACHE_STRING = "RECENT_TWEETS"
LAST_MONTH_CACHE_STRING = "LAST_MONTH_TWEETS"
USER_FLU_CACHE_STRING = "USER_FLU_PREDICTION"

recent_tweet_cache = Cache(RECENT_TWEET_CACHE_STRING)
last_month_tweet_cache = Cache(LAST_MONTH_CACHE_STRING)
user_flu_prediction_cache = Cache(USER_FLU_CACHE_STRING)
cache = Cache("")
