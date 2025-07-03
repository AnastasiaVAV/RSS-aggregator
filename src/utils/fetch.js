import axios from 'axios'

export default (url) => {
  const allOriginsUrl = new URL('https://allorigins.hexlet.app/get')
  allOriginsUrl.searchParams.set('disableCache', 'true')
  allOriginsUrl.searchParams.set('url', url)

  return axios.get(allOriginsUrl.toString())
    .catch(() => {
      throw new Error('form.feedbackMessage.errors.networkProblems')
    })
}
