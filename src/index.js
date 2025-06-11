import * as yup from 'yup'
import i18n from 'i18next'
import { proxy } from 'valtio/vanilla'
import ru from './locales/ru.js'
import render from './view.js'

const isValid = (url, feeds, i18n) => {
  const schema = yup
    .string()
    .url(i18n.t('form.errors.notValidUrl'))
    .matches(/^(http|https).*(xml|rss|atom).*/, i18n.t('form.errors.notValidRss'))
    .notOneOf(feeds, i18n.t('form.errors.notUniqueUrl'))
    // .required('URL обязателен')
  return schema.validate(url)
    .then(() => true)
    .catch(err => Promise.reject(err.errors[0]))
}

const elements = {
  form: document.querySelector('.rss-form'),
  input: document.getElementById('url-input'),
  submit: document.querySelector('[type="submit"]'),
  feedbackMessage: document.querySelector('.feedback'),
}

export default () => {
  const i18nInstance = i18n.createInstance()
  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  })
  // .then(() => {
  //   const title = document.querySelector('h1')
  //   title.textContent = i18nInstance.t('project.title')
  // })

  const state = proxy({
    rssForm: {
      status: 'filling', // 'sending', 'success', 'failed'
      error: null,
      valid: true,
    },
    feeds: [],
  })
  const watchedState = render(state, elements, i18nInstance)

  elements.input.addEventListener('input', (e) => {
    state.rssForm.status = 'filling'
    const url = e.target.value
    isValid(url, state.feeds, i18nInstance)
      .then(() => {
        watchedState.rssForm.valid = true
        watchedState.rssForm.error = null
      })
      .catch((error) => {
        watchedState.rssForm.valid = false
        watchedState.rssForm.error = error
        // console.log(state.rssForm.error)
      })
  })

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const url = formData.get('url').trim()
    state.rssForm.status = 'sending'
    if (!state.rssForm.error) {
      watchedState.rssForm.valid = true
      watchedState.feeds.push(url)
      watchedState.rssForm.status = 'success'
    }
    else {
      watchedState.rssForm.valid = false
      watchedState.rssForm.status = 'failed'
    }
  })
}
