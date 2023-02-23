from rest_framework import serializers
from core.models.tweet_model import Tweet

class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet

        fields = "__all__"
        