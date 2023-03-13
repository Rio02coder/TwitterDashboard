import numpy as np
from collections import OrderedDict
from collections import defaultdict
from nltk.tokenize import TweetTokenizer
from cleantext import clean
import re


def split_train_test(data, labels, fold):
    c_data, c_labels = len(data), len(labels)
    assert c_data == c_labels
    nb = int(c_data / fold)
    train = []
    test = []
    for i in range(1, fold + 1):
        start, end = nb * i - nb, nb * i
        train.append(list(range(start, int(start + (nb * 0.8)))))
        test.append(list(range(int(end - (nb * 0.2)), end)))
    return train, test


def split(data, fold):
    data = data.userid.unique()
    c_data = len(data)
    np.random.seed(0)
    data = np.random.choice(data, size=c_data, replace=False)
    nb = int(c_data / fold)
    data_index = []
    for i in range(1, fold + 1):
        start, end = nb * i - nb, nb * i
        data_index.append(data[start: end])
    return data_index


def token_text(twk, text):
    # twk = twikenizer.Twikenizer()
    res = twk.tokenize(text)
    return res

class TweetCleaner:

    def __init__(self, tweet_list):
        self.tweet_list = tweet_list

    def _remove_links(self, tweet):
        '''Takes a string and removes web links from it'''
        tweet = re.sub(r'https?:\/\/\S+\b|www\.(\w+\.)+\S*',
                       'url', tweet)  # remove http links
        # tweet = re.sub(r'bit.ly/\S+', 'url', tweet)  # rempve bitly links
        # tweet = tweet.strip('[link]')  # remove [links]
        return tweet

    def _remove_users(self, tweet):
        '''Takes a string and removes retweet and @user information'''
        tweet = re.sub('(RT\s@\w+)', 'rt user', tweet)  # remove retweet
        tweet = re.sub('(@\w+)', 'user', tweet)  # remove tweeted at
        return tweet

    def _hashtag(self, tweet):
        tweet = tweet.group()
        hashtag_body = tweet[1:]
        result = "<hashtag> {} ".format(hashtag_body.lower())
        return result

    def _remove_emojis(self, tweet):
        return clean(tweet, no_emoji=True)

    def _replace_tweet(self, tweet):
        # should remove &amp;
        tweet = self._remove_users(tweet)
        tweet = self._remove_links(tweet)
        tweet = self._remove_emojis(tweet)
        tweet = re.sub("#\S+", self._hashtag, tweet)
        tweet = tweet.lower()
        tweet = re.sub("[-+]?[.\d]*[\d]+[:,.\d]*",
                       "number", tweet)  # remove numbers
        tweet = re.sub("\n", " ", tweet)
        tweet = tweet.strip()
        return tweet

    def get_cleaned_tweets(self):
        cleaned_tweets = []
        for tweet in self.tweet_list:
            cleaned_tweet = self._replace_tweet(tweet)
            cleaned_tweets.append(cleaned_tweet)

        return cleaned_tweets


class Tokenizer(object):
    def __init__(self, num_words=None,
                 lower=True,
                 oov_token=None,
                 document_count=0,
                 **kwargs):
        self.num_words = num_words
        self.word_counts = OrderedDict()
        self.word_docs = defaultdict(int)
        self.index_docs = defaultdict(int)
        self.document_count = document_count
        # self.twk = twikenizer.Twikenizer()
        self.twk = TweetTokenizer(reduce_len=True)
        self.oov_token = oov_token
        self.word_index = dict()
        self.index_word = dict()
        self.lower = lower

    def token_text(self, text):
        return self.twk.tokenize(text)

    def fit_on_texts(self, texts):
        # pool = mp.Pool(processes=8)
        # results = [pool.apply_async(token_text, args=(text.lower(),)) for text in texts]
        # output = [p.get() for p in results]
        # pool.close()
        # pool.join()
        # texts = output

        # output = []
        # for text in texts:
        #     p = mp.Process(target=self.token_text, args=(text,))
        #     output.append(p)
        # texts = [x.start() for x in output]

        # for text in output:
        for text in texts:
            seq = text
            # seq = self.twk.tokenize(text.lower())
            for w in seq:
                if w in self.word_counts:
                    self.word_counts[w] += 1
                else:
                    self.word_counts[w] = 1
            for w in set(seq):
                # In how many documents each word occurs
                self.word_docs[w] += 1

        wcounts = list(self.word_counts.items())
        wcounts.sort(key=lambda x: x[1], reverse=True)
        # forcing the oov_token to index 1 if it exists
        if self.oov_token is None:
            sorted_voc = []
        else:
            sorted_voc = [self.oov_token]
        sorted_voc.extend(wc[0] for wc in wcounts)

        # note that index 0 is reserved, never assigned to an existing word
        self.word_index = dict(
            list(zip(sorted_voc, list(range(1, len(sorted_voc) + 1)))))

        self.index_word = dict((c, w) for w, c in self.word_index.items())

        for w, c in list(self.word_docs.items()):
            self.index_docs[self.word_index[w]] = c

    def texts_to_sequences(self, texts):
        seq = []
        for text in texts:
            # seq = self.twk.tokenize(text.lower())
            seq.append(self.twk.tokenize(text.lower()))
        # return list(self.texts_to_sequences_generator(texts))
        return list(self.texts_to_sequences_generator(seq))

    def lists_to_sequences(self, texts):
        return list(self.texts_to_sequences_generator(texts))

    def texts_to_sequences_generator(self, texts):
        num_words = self.num_words
        oov_token_index = self.word_index.get(self.oov_token)
        for text in texts:
            #     seq = self.twk.tokenize(text.lower())
            seq = text

            vect = []
            for w in seq:
                i = self.word_index.get(w)
                if i is not None:
                    if num_words and i >= num_words:
                        if oov_token_index is not None:
                            vect.append(oov_token_index)
                    else:
                        vect.append(i)
                elif self.oov_token is not None:
                    vect.append(oov_token_index)
            yield vect
