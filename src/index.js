// import * as yup from 'yup'
// import { proxy, subscribe, snapshot } from 'valtio'

// const isValid = (url, feeds) => {
//   const schema = yup
//     .string()
//     .url()
//     .matches(/^(http|https):\/\/.*\.(xml|rss|atom)$/, 'Должен быть корректный RSS-URL')
//     .notOneOf(feeds)
//     .required()
//   return schema.validateSync(url)
// }

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

export default () => {
  console.log("index.js executed!")
}
