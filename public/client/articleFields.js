const ARTICLE_TEMPLATE = {
  Story: '',
  Url: '',
  Site: '',
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
  Story: {
    required: true,
    type: 'dropdown'
  },
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
    type: 'url'
  },
  Syndication: {
    required: false,
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

let INPUT_FIELDS = [
  'datetime',
  'text',
  'url'
]

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
  'Story': STORIES
  'Syndication': SYNDICATIONS
}