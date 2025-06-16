import * as yup from 'yup'

export default (feeds) => {
  return yup
    .string()
    .url()
    .notOneOf(feeds.map(feed => feed.url))
}
