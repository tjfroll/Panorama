"""test_nytapi.py

Tests accessing and querying the NYTimes article search API.
"""
import sys
sys.path.append('..')
from panorama.handle_apis import nytimes_api
import nytimesarticle as nyt

api = nytimes_api()

print(api.search(q='Michael Flynn'))

print(articles)
