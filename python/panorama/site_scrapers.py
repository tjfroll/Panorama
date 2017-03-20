# -*- coding: utf-8 -*-
"""site_scrapers.py

A collection of website-specific article scrapers.

Example:
    TODO: Put an example here.

Todo:
    * Add an example.

"""
import re

from handle_apis import nytimes_api


def scrape_nytimes(topic, begin_date=None, end_date=None):
    """Use the NYTimes article API to pull articles from nytimes.com.

    Args:
        topic (str): For which to search for articles
        begin_date (str): Article search begin date.
        end_date (str): Article search end date.

    Returns:
        article_dicts (list of dict): List of article data dicts.
        raw_result (dict): Raw NYTimes API search result.

    """
    # Get the NYTimes article API
    api = nytimes_api()
    # Format the search query
    search_dict = {'q': topic}
    if not (begin_date is None):
        search_dict['begin_date'] = begin_date
    if not (end_date is None):
        search_dict['end_date'] = end_date

    # Perform the search
    raw_result = api.search(**search_dict)

    # Create a dict of article information per article
    article_dicts = []

    for article in raw_result['response']['docs']:
        # Generate a list of authors
        if not article['byline']:
            authors = []
        else:
            auth_str = article['byline']['original']
            auth_str = auth_str.replace('By ', '').replace(' and', ',')
            authors = auth_str.split(', ')

        # Create an article information dict
        dic = {
            'Topic': topic,
            'Host': 'The New York Times',
            'Publisher': article['source'],
            'Link': article['web_url'],
            'Published': article['pub_date'],
            'Headline': article['headline']['main'],
            'Authors': authors,
            'Contributors': [],
            'Keywords': [kw['value'] for kw in article['keywords']]
        }

        article_dicts.append(dic)

    return article_dicts, raw_result
