import onChange from 'on-change'

const renderForm = (state, elements, i18n) => {
  const { rssForm, uiState } = state
  elements.form.feedbackMessage.classList.remove('text-danger', 'text-success')
  switch (rssForm.status) {
    case 'filling':
      elements.form.submit.disabled = false
      break
    case 'sending':
      elements.form.submit.disabled = rssForm.valid
      elements.form.feedbackMessage.textContent = ''
      break
    case 'success':
      elements.form.submit.disabled = false
      elements.form.feedbackMessage.classList.add(`text-${uiState.formFeedbackMessage}`)
      elements.form.feedbackMessage.textContent = i18n.t('form.feedbackMessage.success')
      elements.form.form.reset()
      elements.form.input.focus()
      break
    case 'failed':
      console.log(rssForm.status)
      console.log(uiState.formFeedbackMessage)
      elements.form.submit.disabled = false
      elements.form.feedbackMessage.classList.add(`text-${uiState.formFeedbackMessage}`)
      elements.form.feedbackMessage.textContent = i18n.t(state.rssForm.error)
      elements.form.input.focus()
      break
    default:
      return
  }
}

export default (state, elements, i18n) => onChange(state, (path) => {
  switch (path) {
    case 'rssForm.status':
      renderForm(state, elements, i18n)
      break
    case 'rssForm.error':
      break
    case 'rssForm.valid':
      // renderForm(state, elements, i18n)
      break
    default:
      return
  }
})
