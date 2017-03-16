# -*- coding: utf-8 -*-
"""handle_apis.py

Functions to handle individual news site APIs.

Example:
    TODO: Put an example here.

Todo:
    * Add an example.

"""
import nytimesarticle as nyt


def nytimes_api():
    """Return a handle to the New York Times article API.

    Load an API key from a local file not included in the git repository,
    then use it to acquire a handle to the New York Times article API.

    Returns:
        api (nytimesarticle.articleAPI): A New York Times article API handle.

    """
    # File containing the New York Times API key
    key_file = 'api-keys/nytimes.txt'
    # Read in the key string
    with open(key_file) as f:
        key = f.read()
    return nyt.articleAPI(key)