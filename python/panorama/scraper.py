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

scrapable_sources = ['washingtonpost.com',
                     'breitbart.com',
                     'nytimes.com']
"""list of str: Web source URLs for scraping article information.
"""

source_data = {'washingtonpost.com': {'Host': 'Washington Post'},
               'breitbart.com': {'Host': 'Breitbart'},
               'nytimes.com': {'Host': 'The New York Times'}
               }
"""dict: Hand-specified data about each of the scrapable sources.
"""


def article_data(article, source):
    """Build a dict containing information about a specified article
    from a specified web source.

    Given an article, pull out information about the article and save to a
    dict. Since the parsing procedure may be website-dependent, source
    information is included as a URL string. Currently, no default parsing
    format is available, so source strings not in scrapable_sources will
    generate an error.

    Args:
        article (newspaper.article.Article): Article to pull information from.
        source (str): Article source URL.

    Returns:
        info_dict (dict): A dict containing article information.

    """
    # Create article information as a dict
    info_dict = {}

    # Source-independent article information

    # Article host
    info_dict['Host'] = source_data[source]['Host']

    # Source-dependent article information

    if source == 'washingtonpost.com':
        pass # TODO: Keep going

    return info_dict


def keywords_from_html(article, name='keywords'):
    """Extract HTML-defined keywords from an article.

    Looks for a meta tag named [name], and return all keywords as a list by
    splitting the keywords string at commas.

    Args:
        article (newspaper.article.Article): Article to search for meta tag
                                             keywords.
        name (str): Name of the meta tag with keyword data.

    Returns:
        keywords (list of str): A list of keywords.

    """
    # Use BeautifulSoup to parse input HTML
    soup = bs4.BeautifulSoup(article.html, 'lxml')
    # Find the 'keywords' meta tag
    keywords_tag = soup.find('meta', {'name': name})
    if keywords_tag is None:
        return None
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


def matches_keywords(article, keywords):
    """Check if an article's keywords contain any of the specified keywords.

    Pull keywords from a Newspaper Article, both by checking for keywords
    specified in an HTML meta tag and by using Newspaper's NLP tools to
    extract keywords from the Article text. Return bools which indicate
    whether matches were found in either or both keyword sources.

    Args:
        article (newspaper.article.Article): Article to check.
        keywords (list of str): List of keywords to compare against Article
                                keywords.

    Returns:
        matches_html (bool): True if the HTML meta keyword list contains any
                             of the specified keywords, else False.
        matches_nlp (bool): True if keywords returned via NLP analysis match
                            any of the specified keywords, else False.

    """
    # Make sure all keywords are lower case, and have no leading or trailing
    # whitespace. Then, convert to a set
    keywords = {s.strip().lower() for s in keywords}

    # Compare input keywords against html keywords
    keywords_html = keywords_from_html(article)
    matches_html = len(keywords & set(keywords_html)) > 0

    # Compare input keywords against NLP keywords
    keywords_nlp = keywords_from_nlp(article)
    matches_nlp = len(keywords & set(keywords_nlp)) > 0

    return matches_html, matches_nlp


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
    # Get article info from the source URL
    source_build = newspaper.build('https://' + source)

    # Initialize the output list of JSON data
    json_files = []

    # Use these for building article relevance scores. Currently very simple:
    # A score of 2 is assigned for an HTML metadata keyword match, and a score
    # of 1 is assigned for a Newspaper NLP analysis keyword match, and scores
    # are additive
    score_html = 2
    score_nlp = 1

    # Iterate through articles scraped from the source
    for article in source_build.articles:
        # Check if there are any keyword matches
        matches_html, matches_nlp = matches_keywords(article, keywords)

        # If so, build a JSON array with article info
        if matches_html or matches_nlp:
            pass # TODO: Keep going





