import rssFetch from './fetch'
import parser from './parser'

const checkFeeds = (state) => {
  const { feeds, posts: statePosts } = state
  // console.log('new start')
  const promises = feeds.map(({ url, id }) => {
    return rssFetch(url)
      .then(({ data }) => {
        const statePostsForFeed = statePosts.filter(({ feedId }) => feedId === id)
        const stateLinks = statePostsForFeed.map(post => post.link)
        const [, currentPosts] = parser(data.contents)
        const newPosts = currentPosts
          .filter(post => !stateLinks.includes(post.link))
          .map(post => ({ ...post, feedId: id }))
        // console.log(newPosts)
        if (newPosts.length !== 0) {
          state.posts = [...statePosts, ...newPosts]
        }
      })
      .catch(err => console.log(err))
  })

  Promise.all(promises)
    .finally(() => {
      // console.log('start update again')
      setTimeout(() => checkFeeds(state), 5000)
    })
}

export default checkFeeds
