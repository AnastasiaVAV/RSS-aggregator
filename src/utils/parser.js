export default (content) => {
  const data = new DOMParser().parseFromString(content, 'application/xml')
  if (data.querySelector('parsererror')) {
    throw new Error('form.feedbackMessage.errors.notValidRss')
  }

  const feed = {
    title: data.querySelector('title').textContent,
    description: data.querySelector('description').textContent,
  }

  const items = [...data.querySelectorAll('item')]
  const posts = items
    .reverse()
    .map((item) => {
      const title = item.querySelector('title').textContent
      const description = item.querySelector('description').textContent
      const link = item.querySelector('link').textContent
      return { title, description, link }
    })

  return [feed, posts]
}
