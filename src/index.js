// import * as yup from 'yup'
import { setLocale } from 'yup'
import i18n from 'i18next'
// import axios from 'axios'
import validator from './utils/validator.js'
import parser from './utils/parser.js'
import rssFetch from './utils/fetch.js'
import ru from './locales/ru.js'
import render from './view.js'

const elements = {
  title: document.querySelector('h1'),
  titleDescription: document.querySelector('.lead'),
  form: {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    label: document.querySelector('label[for="url-input"]'),
    submit: document.querySelector('button[type="submit"]'),
    exampleRss: document.querySelector('.text-muted'),
    feedbackMessage: document.querySelector('.feedback'),
  },
  posts: document.querySelector('.posts'),
  feeds: document.querySelector('.feeds'),
}

const isValid = (url, feeds) => {
  return validator(feeds).validate(url)
    .then(() => true)
    .catch((err) => {
      // console.log(err.errors[0])
      return Promise.reject(err.errors[0])
    })
}

export default () => {
  const defaultLanguage = 'ru'
  const i18nInstance = i18n.createInstance()
  i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources: {
      ru,
    },
  })
    .then(() => {
      elements.title.textContent = i18nInstance.t('title')
      elements.titleDescription.textContent = i18nInstance.t('titleDescription')
      elements.form.label.textContent = i18nInstance.t('form.input')
      elements.form.submit.textContent = i18nInstance.t('form.submitButton')
      elements.form.exampleRss.textContent = i18nInstance.t('form.exampleRss')
    })

  setLocale({
    mixed: {
      notOneOf: 'form.feedbackMessage.errors.notUniqueUrl',
    },
    string: {
      url: 'form.feedbackMessage.errors.notValidUrl',
    },
  })
  const state = {
    language: defaultLanguage,
    rssForm: {
      status: 'filling', // 'sending', 'success', 'failed'
      error: null,
      valid: true,
    },
    feeds: [], // { url: 'http...', title, description, id: 1 }
    posts: [],
    uiState: {
      formFeedbackMessage: '', // text-danger, text-success
    },
  }
  const watchedState = render(state, elements, i18nInstance)

  elements.form.form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const url = formData.get('url').trim()
    const lastIdCount = state.feeds[state.feeds.length - 1]?.id || 0
    const currentIdCount = lastIdCount + 1
    state.rssForm.status = 'sending'
    isValid(url, state.feeds)
      .then(() => {
        state.rssForm.valid = true
        state.rssForm.error = null
        return rssFetch(url)
      })
      .then(({ data }) => {
        const [feed, postsArr] = parser(data.contents)
        const newFeed = { url, ...feed, id: currentIdCount }
        const postsForFeed = { feedId: currentIdCount, posts: postsArr }
        // const postsForFeed = posts.map(post => ({ ...post, feedId: currentIdCount }))
        state.uiState.formFeedbackMessage = 'success'
        watchedState.rssForm.status = 'success'
        watchedState.feeds = [newFeed, ...state.feeds]
        watchedState.posts = ([postsForFeed, ...state.posts])
        console.log(state.posts)
      })
      .catch((err) => {
        state.rssForm.valid = false
        state.rssForm.error = err
        state.uiState.formFeedbackMessage = 'danger'
        watchedState.rssForm.status = 'failed'
      })
  })
}
