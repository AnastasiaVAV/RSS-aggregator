import { setLocale } from 'yup'
import i18n from 'i18next'
import _ from 'lodash'
import resources from './locales/index.js'
import validator from './utils/validator.js'
import parser from './utils/parser.js'
import update from './utils/update.js'
import rssFetch from './utils/fetch.js'
import onChange, { renderText } from './view.js'

const isValid = (url, feeds) => {
  return validator(feeds).validate(url)
    .then(() => true)
    .catch((err) => {
      throw err
    })
}

export default () => {
  const defaultLanguage = 'ru'

  const i18nInstance = i18n.createInstance()
  i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  })

  setLocale({
    mixed: {
      notOneOf: 'form.feedbackMessage.errors.notUniqueUrl',
    },
    string: {
      url: 'form.feedbackMessage.errors.notValidUrl',
    },
  })

  const elements = {
    title: document.querySelector('h1'),
    titleDescription: document.querySelector('.lead'),

    form: {
      formEl: document.querySelector('.rss-form'),
      input: document.getElementById('url-input'),
      label: document.querySelector('label[for="url-input"]'),
      submit: document.querySelector('button[type="submit"]'),
      exampleRss: document.querySelector('.text-muted'),
      feedbackMessage: document.querySelector('.feedback'),
    },

    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),

    modal: {
      modalContainer: document.querySelector('#modal'),
      title: document.querySelector('.modal-title'),
      description: document.querySelector('.modal-body'),
      readMore: document.querySelector('.modal-footer > .full-article'),
      close: document.querySelector('.modal-footer > .btn-secondary'),
    },
  }

  const state = {
    language: defaultLanguage,
    processStatus: 'idle', // 'sending', 'success', 'failed'
    rssForm: {
      error: null,
      valid: true,
    },
    feeds: [], // { url: 'http...', title, description, id: 1 }
    posts: [], // {  title, description, link, feedId}
    modalOpenPostId: null,
    uiState: {
      viewedPostsIds: new Set(),
    },
  }

  renderText(state, elements, i18nInstance)
  const watchedState = onChange(state, elements, i18nInstance)

  elements.form.formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const url = formData.get('url').trim()
    watchedState.processStatus = 'sending'
    isValid(url, state.feeds)
      .then(() => {
        return rssFetch(url)
      })
      .then(({ data }) => {
        const [feed, posts] = parser(data.contents)
        const newFeed = { url, ...feed }
        const newPosts = posts.map(post => ({ ...post, id: _.uniqueId(), feedUrl: url }))
        watchedState.rssForm.valid = true
        watchedState.rssForm.error = null
        watchedState.processStatus = 'success'
        watchedState.feeds = [...state.feeds, newFeed]
        watchedState.posts = [...state.posts, ...newPosts]
      })
      .catch((err) => {
        watchedState.rssForm.valid = false
        watchedState.rssForm.error = err.message
        watchedState.processStatus = 'failed'
      })
  })

  elements.posts.addEventListener('click', (e) => {
    const target = e.target
    const id = target.dataset.id
    if (id) {
      watchedState.uiState.viewedPostsIds = new Set([...state.uiState.viewedPostsIds, id])
      if (e.target.matches('[data-bs-toggle="modal"]')) {
        watchedState.modalOpenPostId = id
      }
    }
  })
  update(watchedState)
}
