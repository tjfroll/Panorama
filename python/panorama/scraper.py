# -*- coding: utf-8 -*-
"""scraper.py

Use bs4 and newspaper packages to extract information from news articles.

Example:
    TODO: Put an example here

Todo:
    * Add an example.

"""
import bs4
import newspaper


def keywords_from_html(article):
    """Extract HTML-defined keywords from an article.

    Looks for a meta tag named "keywords", and return all keywords as a list by
    splitting the keywords string at commas.

    Args:
        article (newspaper.article.Article): Article to search for meta tag
                                             keywords.

    Returns:
        keywords (list of str): A list of keywords.

    """
    # Use BeautifulSoup to parse input HTML
    soup = bs4.BeautifulSoup(article.html, 'lxml')
    # Find the 'keywords' meta tag
    keywords_tag = soup.find('meta', {'name': 'keywords'})
    # Get the 'keywords' meta tag contents
    keywords_str = keywords_tag['content']
    # Split contents along commas
    keywords = keywords_str.split(',')
    # Strip leading and trailing whitespace from each of the list entries
    return [s.strip().lower() for s in keywords]


def keywords_from_nlp(article):
    """Extract keywords from an article using Newspaper's NLP tools.

    Returns article.keywords, as defined by the Newspaper package.

    Args:
        article (newspaper.article.Article): Article to get keywords from.

    Returns:
        keywords (list of str): A list of keywords.

    """
    # Parse the article
    article.parse()
    # Run Newspaper NLP tools
    article.nlp()
    # Return keywords as a list of strings
    return [str(s).lower() for s in article.keywords]


def scrape_for_keywords(source, keywords):
    """Scrape news articles from a web source, return information about
    articles containing specified keywords.

    Pulls all the articles that the Newspaper package finds from a source
    URL, and extracts keywords from two sources: author-specified keywords
    included in HTML metadata, and keywords extracted from the article text
    using Newspaper's NLP tools. Articles with keywords matching any of the
    input keywords are processed to create a JSON array with article
    information used for the [INSERT NAME HERE] app.

    Args:
        source (str): News source URL.
        keywords (list of str): Keywords to look for in articles pulled from
                                the news source.

    Returns:
        json_files (list of str): A list of JSON data, one JSON array per
                                  article which matches the input keywords.

    """

