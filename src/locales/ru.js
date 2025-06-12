export default {
  translation: {
    title: 'RSS агрегатор',
    titleDescription: 'Начните читать RSS сегодня! Это легко, это красиво.',
    form: {
      input: 'Ссылка RSS',
      submitButton: 'Добавить',
      exampleRss: 'Пример: https://lorem-rss.hexlet.app/feed',
      feedbackMessage: {
        success: 'RSS успешно загружен',
        errors: {
          notUniqueUrl: 'RSS уже существует',
          notValidUrl: 'Ссылка должна быть валидным URL',
          notValidRss: 'Ресурс не содержит валидный RSS',
          networkProblems: 'Ошибка сети',
        },
      },
    },
  },
}
