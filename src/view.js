import onChange from 'on-change'
import * as bootstrap from 'bootstrap'

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
      elements.form.submit.disabled = false
      elements.form.feedbackMessage.classList.add(`text-${uiState.formFeedbackMessage}`)
      elements.form.feedbackMessage.textContent = i18n.t(state.rssForm.error)
      elements.form.input.focus()
      break
    default:
      return
  }
}

const renderSection = (sectionType, i18n) => {
  const container = document.createElement('div')
  container.classList.add('card', 'border-0')

  const sectionNameContainer = document.createElement('div') // контейнер названия секции
  sectionNameContainer.classList.add('card-body')

  const sectionName = document.createElement('h2') // название секции
  sectionName.classList.add('card-title', 'h4')
  sectionName.textContent = i18n.t(`${sectionType}.sectionTitle`)

  const list = document.createElement('ul')
  list.classList.add('list-group', 'border-0', 'rounded-0')

  sectionNameContainer.append(sectionName)
  container.append(sectionNameContainer)

  return { container, list }
}

const renderFeeds = (state, elements, i18n) => {
  elements.feeds.innerHTML = ''
  const { container, list } = renderSection('feeds', i18n)
  const feeds = state.feeds

  feeds.forEach(({ title, description }) => {
    const item = document.createElement('li')
    item.classList.add('list-group-item', 'border-0', 'border-end-0')

    const feedTitle = document.createElement('h3')
    feedTitle.classList.add('h6', 'm-0')
    feedTitle.textContent = title

    const feedDescription = document.createElement('p')
    feedDescription.classList.add('m-0', 'small', 'text-black-50')
    feedDescription.textContent = description
    item.append(feedTitle, feedDescription)
    list.append(item)
  })
  container.append(list)
  elements.feeds.append(container)
}

const renderLinks = (state) => {
  state.viewedPostsId.forEach((currentId) => {
    const currentPost = document.querySelector(`[data-id="${currentId}"]`)
    currentPost.classList.remove('fw-bold', 'fw-normal')
    currentPost.classList.add('fw-normal', 'link-secondary')
  })
}

const renderPosts = (state, elements, i18n) => {
  elements.posts.innerHTML = ''
  const { container, list } = renderSection('posts', i18n)
  const posts = state.posts

  posts.forEach(({ title, link, id }) => {
    const item = document.createElement('li')
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')

    const linkEl = document.createElement('a')
    linkEl.classList.add('fw-bold')
    linkEl.href = link
    linkEl.target = '_blank'
    linkEl.rel = 'noopener noreferrer'
    linkEl.dataset.id = id
    linkEl.textContent = title

    const buttonModal = document.createElement('button')
    buttonModal.classList.add('btn', 'btn-outline-primary', 'btn-sm')
    buttonModal.dataset.bsToggle = 'modal'
    buttonModal.dataset.bsTarget = '#modal'
    buttonModal.dataset.id = id
    buttonModal.textContent = i18n.t('posts.openModal')

    item.append(linkEl, buttonModal)
    list.prepend(item)
  })
  container.append(list)
  elements.posts.append(container)
  renderLinks(state)
}

const renderModal = (state, elements) => {
  const { title, description, link, id } = state.posts.find(post => post.id === state.modalOpenPostId)
  console.log(id)

  elements.modal.title.textContent = title
  elements.modal.description.textContent = description
  elements.modal.readMore.href = link

  const modal = bootstrap.Modal.getOrCreateInstance(elements.modal.modalContainer)
  console.log(modal)
  // modal.show()
}

export default (state, elements, i18n) => onChange(state, (path) => {
  switch (path) {
    case 'rssForm.status':
      renderForm(state, elements, i18n)
      break
    case 'feeds':
      renderFeeds(state, elements, i18n)
      break
    case 'posts':
      renderPosts(state, elements, i18n)
      break
    case 'viewedPostsId':
      renderLinks(state)
      break
    case 'uiState.modal.hidden':
      renderModal(state, elements)
      break
    default:
      return
  }
})
