import rssFetch from './fetch'
import parser from './parser'

const update = (state) => {
  const { feeds, posts: statePosts } = state

  const promises = feeds.map(({ url }) => {
    return rssFetch(url)
      .then(({ data }) => {
        const statePostsForFeed = statePosts.filter(({ feedUrl }) => feedUrl === url)
        const stateLinks = statePostsForFeed.map(post => post.link)
        const [, currentPosts] = parser(data.contents)
        const newPosts = currentPosts
          .filter(post => !stateLinks.includes(post.link))
          .map(post => ({ ...post, feedUrl: url }))
        if (newPosts.length !== 0) {
          state.posts = [...statePosts, ...newPosts]
        }
      })
      .catch(err => console.log(err))
  })

  Promise.all(promises)
    .finally(() => {
      setTimeout(() => update(state), 5000)
    })
}

export default update
