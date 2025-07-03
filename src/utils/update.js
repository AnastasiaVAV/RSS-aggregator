import rssFetch from './fetch'
import parser from './parser'
import _ from 'lodash'

const timeout = 5000

const update = (state) => {
  const { feeds, posts: statePosts } = state

  const promises = feeds.map(({ url }) => {
    return rssFetch(url)
      .then(({ data }) => {
        const statePostsForFeed = statePosts.filter(({ feedUrl }) => feedUrl === url)
        const [, currentPosts] = parser(data.contents)
        const newPosts = _.differenceWith(currentPosts, statePostsForFeed, (currentPost, statePost) => currentPost.link === statePost.link)
          .map(post => ({ ...post, id: _.uniqueId(), feedUrl: url }))
        if (newPosts.length !== 0) {
          state.posts = [...statePosts, ...newPosts]
        }
      })
      .catch(err => console.log(err))
  })

  Promise.all(promises)
    .finally(() => {
      setTimeout(() => update(state), timeout)
    })
}

export default update
