// import * as yup from 'yup'
import { setLocale } from 'yup'
import i18n from 'i18next'
import validator from './utils/validator.js'
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
}

const isValid = (url, feeds) => {
  return validator(feeds).validate(url)
    .then(() => true)
    .catch((err) => {
      console.log(err.errors[0])
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
    feeds: [],
    uiState: {
      formFeedbackMessage: '', // text-danger, text-success
    },
  }
  const watchedState = render(state, elements, i18nInstance)

  elements.form.form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const url = formData.get('url').trim()
    state.rssForm.status = 'sending'
    isValid(url, state.feeds)
      .then(() => {
        watchedState.feeds.push(url)
        watchedState.rssForm.valid = true
        watchedState.rssForm.error = null
        watchedState.uiState.formFeedbackMessage = 'success'
        watchedState.rssForm.status = 'success'
        // console.log(state.uiState.formFeedbackMessage)
      })
      .catch((error) => {
        watchedState.rssForm.valid = false
        watchedState.rssForm.error = error
        watchedState.uiState.formFeedbackMessage = 'danger'
        watchedState.rssForm.status = 'failed'
        // console.log(state.uiState.formFeedbackMessage)
      })
  })
}
