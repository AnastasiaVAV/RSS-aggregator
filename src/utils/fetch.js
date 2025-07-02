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

// export default (url) => {
//   return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
//     .catch(() => {
//       throw new Error('form.feedbackMessage.errors.networkProblems')
//     })
// }
