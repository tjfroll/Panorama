const ARTICLE_TEMPLATE = {
  Url: '',
  Site: '',
  Story: '',
  Source: '',
  Syndication: '',
  Headline: '',
  Description: '',
  Keywords: [],
  Authors: [],
  Contributors: [],
  Published: '',
  Updated: ''
}

const ARTICLE_FIELDS = {
  Url: {
    required: true,
    type: 'url'
  },
  Site: {
    required: true,
    type: 'dropdown'
  },
  Source: {
    required: false,
    type: 'dropdown'
  },
  SourceUrl: {
    required: false,
    type: 'url'
  },
  Syndication: {
    required: false,
    type: 'dropdown'
  },
  Story: {
    required: true,
    type: 'dropdown'
  },
  Headline: {
    required: true,
    type: 'text'
  },
  Description: {
    required: false,
    type: 'text'
  },
  Keywords: {
    required: false,
    type: 'multiselect'
  },
  Authors: {
    required: false,
    type: 'multiselect'
  },
  Contributors: {
    required: false,
    type: 'multiselect'
  },
  Published: {
    required: true,
    type: 'datetime'
  },
  Updated: {
    required: false,
    type: 'datetime'
  }
}

let STORIES = new Variable([])
let AUTHORS = new Variable([])
let CONTRIBUTORS = new Variable([])
let KEYWORDS = new Variable([])
let SITES = new Variable([])
let SYNDICATIONS = new Variable([])

let ITEMS = {
  'Authors': AUTHORS,
  'Contributors': CONTRIBUTORS,
  'Keywords': KEYWORDS,
  'Site': SITES,
  'Source': SITES,
  'Story': STORIES,
  'Syndication': SYNDICATIONS
}