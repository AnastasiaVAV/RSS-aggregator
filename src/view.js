import onChange from 'on-change'
import 'bootstrap'

export const renderText = (state, elements, i18n) => {
  elements.modal.readMore.textContent = i18n.t('modal.readMore')
  elements.modal.close.textContent = i18n.t('modal.close')
  elements.title.textContent = i18n.t('title')
  elements.titleDescription.textContent = i18n.t('titleDescription')
  elements.form.label.textContent = i18n.t('form.input')
  elements.form.submit.textContent = i18n.t('form.submitButton')
  elements.form.exampleRss.textContent = i18n.t('form.exampleRss')
}

const renderForm = (state, elements, i18n) => {
  const { processStatus } = state
  elements.form.feedbackMessage.classList.remove('text-danger', 'text-success')
  switch (processStatus) {
    case 'filling':
      elements.form.submit.disabled = false
      break
    case 'sending':
      elements.form.submit.disabled = true
      elements.form.feedbackMessage.textContent = ''
      break
    case 'success':
      elements.form.submit.disabled = false
      elements.form.feedbackMessage.classList.add('text-success')
      elements.form.feedbackMessage.textContent = i18n.t('form.feedbackMessage.success')
      elements.form.formEl.reset()
      elements.form.input.focus()
      break
    case 'failed':
      elements.form.submit.disabled = false
      elements.form.feedbackMessage.classList.add('text-danger')
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

  const sectionNameContainer = document.createElement('div')
  sectionNameContainer.classList.add('card-body')

  const sectionName = document.createElement('h2')
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
    list.prepend(item)
  })
  container.append(list)
  elements.feeds.append(container)
}

const renderLinks = (state) => {
  state.viewedPostsIds.forEach((currentId) => {
    const currentPost = document.querySelector(`[data-id="${currentId}"]`)
    if (currentPost) {
      currentPost.classList.remove('fw-bold')
      currentPost.classList.add('fw-normal', 'link-secondary')
    }
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
    const linkElClass = state.viewedPostsIds.has(id) ? 'fw-normal link-secondary' : 'fw-bold'
    linkEl.setAttribute('class', linkElClass)
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
}

const renderModal = (state, elements) => {
  const { title, description, link } = state.posts.find(post => post.id === state.modalOpenPostId)

  elements.modal.title.textContent = title
  elements.modal.description.textContent = description
  elements.modal.readMore.href = link
}

export default (state, elements, i18n) => onChange(state, (path) => {
  switch (path) {
    case 'processStatus':
      renderForm(state, elements, i18n)
      break
    case 'feeds':
      renderFeeds(state, elements, i18n)
      break
    case 'posts':
      renderPosts(state, elements, i18n)
      break
    case 'viewedPostsIds':
      renderLinks(state)
      break
    case 'modalOpenPostId':
      renderModal(state, elements)
      break
    default:
      return
  }
})
