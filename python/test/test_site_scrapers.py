# -*- coding: utf-8 -*-
"""test_site_scrapers.py

Tests the functions in site_scrapers.py.

"""
import os
os.chdir('..')
from panorama import scrape_nytimes, save_json

# Test the New York Times scraper

# Pick an example topic
topic = 'Michael Flynn'
# Scrape
article_dicts, _ = scrape_nytimes(topic)
# Save
save_json(article_dicts, 'test/json/')
