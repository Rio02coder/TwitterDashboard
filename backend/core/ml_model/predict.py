import tensorflow as tf
from keras.models import load_model
from keras.optimizers import Adam
from .attention_layer import AttentionWithContext
# from keras_preprocessing.sequence import pad_sequences
from keras.utils import pad_sequences
import numpy as np
from .format_tweet import Tokenizer, TweetCleaner
from keras import backend as K
import os

MAX_NB_WORDS = 50000
MAX_POST_LENGTH = 18
MAX_POSTS = 500


class FluPredictor:

    def __init__(self):
        self.MODEL_NAME = os.path.join(
            os.path.dirname(__file__), "flu_predictor_model.h5")
        self.model = None
        self.formatted_data = None
        self.tokenizer = None

    def _get_formatted_result(self, results):
        control_total = 0
        flu_total = 0
        for result in results:
            control_total += result[0]
            flu_total += result[1]
        return [control_total/len(results), flu_total/len(results)]

    def _get_model_result(self):
        np.random.seed(0)
        tf.random.set_seed(0)
        sess = tf.compat.v1.Session(graph=tf.compat.v1.get_default_graph())
        K.set_session(sess)
        results = self.model.predict(self.formatted_data)
        return self._get_formatted_result(results)

    def _get_tweet_sequence(self, tweets):
        data = np.zeros(
            (len(tweets), MAX_POSTS, MAX_POST_LENGTH), dtype='int32')
        for i, posts in enumerate(tweets):
            for j, post in enumerate(posts):
                if j < MAX_POSTS:
                    sequences = self.tokenizer.texts_to_sequences([post])
                    seq_data = pad_sequences(sequences, maxlen=MAX_POST_LENGTH)
                    data[i, j] = seq_data
        return data

    def _define_formatted_data(self, tweets):
        tweet_cleaner = TweetCleaner(tweets)
        cleaned_tweets = tweet_cleaner.get_cleaned_tweets()
        all_texts = np.hstack(np.array(cleaned_tweets).flatten())
        tokenizer = Tokenizer(num_words=MAX_NB_WORDS)
        tokenizer.fit_on_texts(all_texts)
        self.tokenizer = tokenizer
        self.formatted_data = self._get_tweet_sequence(tweets)

    def _define_model(self):
        self.model = load_model(self.MODEL_NAME, custom_objects={
            'AttentionWithContext': AttentionWithContext, 'optimizer': Adam})

    def predict(self, tweets):
        """Returns the prediction result in the form of
        [control_%, flu_%]"""
        self._define_formatted_data(tweets)
        self._define_model()
        return self._get_model_result()
