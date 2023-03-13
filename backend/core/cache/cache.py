from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.core.cache import cache


class Cache:
    def __init__(self, cache_string):
        self.cache_string = cache_string

    def _get_key_string(self, key):
        return key + self.cache_string

    def set_to_cache(self, key, value, timeout=None):
        ans = cache.set(self._get_key_string(key), value, timeout=timeout)

    def delete_from_cache(self, key):
        cache.delete(self._get_key_string(key))

    def delete_cache_patterns(self, key):
        cache.delete_pattern(key+"*")

    def get_from_cache(self, key):
        return cache.get(self._get_key_string(key))
