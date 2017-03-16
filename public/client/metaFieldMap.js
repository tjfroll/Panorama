const META_FIELD_MAP = {
  'url': {
    field: 'Url',
    priority: 3
  },
  'og:url': {
    field: 'Url',
    priority: 1
  },
  'twitter:url': {
    field: 'Url',
    priority: 2
  },
  'original-source': {
    field: 'Url',
    priority: 4
  },
  'vr:canonical': {
    field: 'Url',
    priority: 5
  },
  'nv:address': {
    field: 'Url',
    priority: 6
  },
  'nv:contentId': {
    field: 'Url',
    priority: 7
  },
  'og:site_name': {
    field: 'Site',
    priority: 1
  },
  'name': {
    field: 'Site',
    priority: 2
  },
  'sourceOrganization': {
    field: 'Site',
    priority: 3
  },
  'cre': {
    field: 'Site',
    priority: 4
  },
  'og:title': {
    field: 'Headline',
    priority: 1
  },
  'twitter:title': {
    field: 'Headline',
    priority: 2
  },
  'sailthru.title': {
    field: 'Headline',
    priority: 3
  },
  'title': {
    field: 'Headline',
    priority: 3
  },
  'hdl': {
    field: 'Headline',
    priority: 4
  },
  'headline': {
    field: 'Headline',
    priority: 5
  },
  'nv:title': {
    field: 'Headline',
    priority: 6
  },
  'og:description': {
    field: 'Description',
    priority: 1
  },
  'twitter:description': {
    field: 'Description',
    priority: 2
  },
  'sailthru.description': {
    field: 'Description',
    priority: 3
  },
  'description': {
    field: 'Description',
    priority: 3
  },
  'abstract': {
    field: 'Description',
    priority: 4
  },
  'lp': {
    field: 'Description',
    priority: 4
  },
  'author': {
    field: 'Authors',
    priority: 1
  },
  'sailthru:author': {
    field: 'Authors',
    priority: 2
  },
  'nv:author': {
    field: 'Authors',
    priority: 3
  },
  'keywords': {
    field: 'Keywords',
    priority: 1
  },
  'news_keywords': {
    field: 'Keywords',
    priority: 2
  },
  'article:tag': {
    field: 'Keywords',
    priority: 3
  },
  'article:section': {
    field: 'Keywords',
    priority: 4
  },
  'article:top-level-section': {
    field: 'Keywords',
    priority: 4
  },
  'article:categories': {
    field: 'Keywords',
    priority: 5
  },
  'articleSection': {
    field: 'Keywords',
    priority: 5
  },
  'sailthru.tags': {
    field: 'Keywords',
    priority: 5
  },
  'section': {
    field: 'Keywords',
    priority: 5
  },
  'nv:tags': {
    field: 'Keywords',
    priority: 5
  },
  'CG': {
    field: 'Keywords',
    priority: 6
  },
  'SCG': {
    field: 'Keywords',
    priority: 6
  },
  'des': {
    field: 'Keywords',
    priority: 6
  },
  'org': {
    field: 'Keywords',
    priority: 6
  },
  'geo': {
    field: 'Keywords',
    priority: 6
  },
  'og:pubdate': {
    field: 'Published',
    priority: 1
  },
  'dateCreated': {
    field: 'Published',
    priority: 2
  },
  'datePublished': {
    field: 'Published',
    priority: 3
  },
  'article:published_time': {
    field: 'Published',
    priority: 3
  },
  'pubdate': {
    field: 'Published',
    priority: 4
  },
  'ptime': {
    field: 'Published',
    priority: 4
  },
  'sailthru.date': {
    field: 'Published',
    priority: 5
  },
  'dateModified': {
    field: 'Updated',
    priority: 1
  },
  'lastmod': {
    field: 'Updated',
    priority: 2
  },
  'utime': {
    field: 'Updated',
    priority: 3
  }
}