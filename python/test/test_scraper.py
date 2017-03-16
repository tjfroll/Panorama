# -*- coding: utf-8 -*-
"""test_scraper.py

Tests the functions in scraper.py.

"""
import sys
sys.path.append("..")

import newspaper

from panorama.scraper import keywords_from_html, keywords_from_nlp


def test_all():
    """Test all functions in the scraper.py module.

    """
    test_keywords_from_html()
    test_keywords_from_nlp()

    return None


def test_keywords_from_html():
    """Test the function keywords_from_html().

    """
    # A test URL
    a_url = "https://www.washingtonpost.com/world/national-security/national-" \
            "security-adviser-flynn-discussed-sanctions-with-russian-" \
            "ambassador-despite-denials-officials-say/2017/02/09/f85b29d6-" \
            "ee11-11e6-b4ff-ac2cf509efe5_story.html"
    # Create a newspaper Article from the url
    art = newspaper.Article(url=a_url)
    # Download the article
    art.download()
    # Extract keywords from the article
    keywords = keywords_from_html(art)

    print(keywords)

    return None


def test_keywords_from_nlp():
    """Test the function keywords_from_nlp().

    """
    # A test URL
    a_url = "https://www.washingtonpost.com/world/national-security/national-" \
            "security-adviser-flynn-discussed-sanctions-with-russian-" \
            "ambassador-despite-denials-officials-say/2017/02/09/f85b29d6-" \
            "ee11-11e6-b4ff-ac2cf509efe5_story.html"
    # Create a newspaper Article from the url
    art = newspaper.Article(url=a_url)
    # Download the article
    art.download()
    # Extract keywords from article HTML
    keywords = keywords_from_nlp(art)

    print(keywords)

    return None
