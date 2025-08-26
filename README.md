# Rss Reader 
[![Actions Status](https://github.com/AnastasiaVAV/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/AnastasiaVAV/frontend-project-11/actions)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=AnastasiaVAV_frontend-project-11&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=AnastasiaVAV_frontend-project-11)

Сервис для агрегации RSS-лент. Позволяет добавлять неограниченное количество источников, автоматически обновлять ленту и читать новости без перехода на внешние сайты

Cсылка на проект – https://frontend-project-11-eosin-sigma.vercel.app/

## Особенности проекта
- Добавление RSS-лент по URL (с валидацией)
- Автоматическое обновление ленты (каждые 5 секунд)
- Просмотр контента без перехода на внешние сайты
- Локализация
- Обработка сетевых ошибок
- Адаптивный интерфейс

## Технологии
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
    

**Библиотеки:**
- `axios` – HTTP-запросы
- `i18next` – интернационализация
- `lodash` – утилиты
- `on-change` – отслеживание изменений состояния
- `yup` – валидация данных

## Установка и запуск
1.  Установите зависимости:
    ```bash
    npm install
    ```
2.  Запустите приложение в режиме разработки:
    ```bash
    npm run dev
    ```
3.  Откройте [http://localhost:5173](http://localhost:5173) в браузере.

## Демонстрация работы
![Демонстрация работы RSS-aggregator](./src/assets/RSS_aggregator.gif)