import * as yup from 'yup'

export default (feeds) => {
  return yup
    .string()
    .url()
    // .matches(/^(http|https).*(xml|rss|atom).*/, i18n.t('form.errors.notValidRss'))
    .notOneOf(feeds)
}
