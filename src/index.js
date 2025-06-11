import * as yup from 'yup'
import i18n from 'i18next'
import { proxy, subscribe, snapshot } from 'valtio/vanilla'
import ru from './locales/ru.js'

const isValid = (url, feeds) => {
  const schema = yup
    .string()
    .url()
    .matches(/^(http|https).*(xml|rss|atom).*/)
    .notOneOf(feeds)
    .required()
  return schema.validateSync(url)
}

// export default () => {
//   const state = proxy({
//     rssForm: {
//       status: 'filling',
//       error: [],
//       valid: true,
//     },
//     feeds: [],
//   })

//   const elements = {
//     form: document.querySelector('.rss-form'),
//     input: document.getElementById('url-input'),
//     submit: document.querySelector('[type="submit"]'),
//     feedbackMessage: document.querySelector('.feedback')
//   }

//   elements.input.addEventListener('input', (e) => {
//     const url = e.target.value
//     console.log(url)
//     state.rssForm.valid = isValid(url, state.feeds)
//   })
// }

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
    .then(() => {
      const title = document.querySelector('h1')
      title.textContent = i18nInstance.t('project.title')
    })

  const state = proxy({
    rssForm: {
      status: 'filling',
      error: [],
      valid: false,
    },
    feeds: [],
  })
  elements.input.addEventListener('input', (e) => {
    const url = e.target.value
    if (isValid(url, state.feeds)) {
      state.rssForm.valid = 'true'
      state.feeds.push(url)
    }
    else {
      state.rssForm.valid = 'false'
    }
    console.log(state.feeds)
  })
}
