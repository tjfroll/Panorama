# -*- coding: utf-8 -*-
"""save_json.py

Convert article data dicts to JSON and saves the resulting arrays to JSON
files in python/json/.

"""
import fnmatch
import json
import os


def save_json(article_dicts, save_dir='json/'):
    """Convert article data dicts to JSON, and save to python/json/.

    Args:
        article_dicts (list of dict): List of article data dicts.
        dir (str): Directory to save stuff into

    Returns:
        None

    """
    # Make sure dir ends with a '/'
    if save_dir[-1] != '/':
        save_dir += '/'

    # File name is just an index of the file in the save directory. Count the
    # number of existing JSON files.
    n_json_files = len(fnmatch.filter(os.listdir(save_dir), '*.json'))

    for i, article in enumerate(article_dicts):
        fid = n_json_files + i
        fname = '{}{}.json'.format(save_dir, fid)
        with open(fname, 'w') as fp:
            json.dump(article, fp)