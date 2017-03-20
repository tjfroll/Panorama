"""test_nytapi.py

Tests accessing and querying the NYTimes article search API.
"""
import os
os.chdir('..')
from panorama.handle_apis import nytimes_api

api = nytimes_api()

print(api.search(q='Michael Flynn'))
