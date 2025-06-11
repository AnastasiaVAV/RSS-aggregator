import { snapshot } from 'valtio/vanilla'
import onChange from 'on-change'

const renderForm = (state, elements, i18n) => {
  const { rssForm } = snapshot(state)
  switch (rssForm.status) {
    case 'filling':
      elements.submit.disabled = !rssForm.valid
      elements.feedbackMessage.textContent = ''
      break
    case 'sending':
      elements.submit.disabled = rssForm.valid
      elements.feedbackMessage.textContent = ''
      break
    case 'success':
      elements.submit.disabled = !rssForm.valid
      elements.feedbackMessage.textContent = i18n.t('form.success')
      elements.feedbackMessage
      elements.form.reset()
      elements.input.focus()
      break
    case 'failed':
      elements.submit.disabled = !rssForm.valid
      elements.feedbackMessage.textContent = state.rssForm.error
      elements.input.focus()
      break
    default:
      return
  }
}

export default (state, elements, i18n) => onChange(state, (path, value) => {
  switch (path) {
    case 'rssForm.status':
      console.log(value)
      renderForm(state, elements, i18n)
      break
    case 'rssForm.error':
      break
    case 'rssForm.valid':
      renderForm(state, elements, i18n)
      break
    default:
      return
  }
})
