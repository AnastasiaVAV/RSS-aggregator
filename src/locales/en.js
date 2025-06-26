export default {
  translation: {
    title: 'RSS aggregator',
    titleDescription: 'Start reading RSS today! It\'s easy, it\'s beautiful.',
    form: {
      input: 'RSS link',
      submitButton: 'Add',
      exampleRss: 'Example: https://lorem-rss.hexlet.app/feed',
      feedbackMessage: {
        success: 'RSS loaded successfully',
        errors: {
          notUniqueUrl: 'RSS already exists',
          notValidUrl: 'Link must be a valid URL',
          notValidRss: 'Resource does not contain a valid RSS',
          networkProblems: 'Network error',
        },
      },
    },
    feeds: {
      sectionTitle: 'Feeds',
    },
    posts: {
      sectionTitle: 'Posts',
      openModal: 'View',
    },
    modal: {
      readMore: 'Read more',
      close: 'Close',
    },
  },
}
