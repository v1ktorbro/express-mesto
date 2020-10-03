# Бэкэнд для проекта [Место Russia](https://v1ktorbro.github.io/react-mesto-api-full/index.html)

* **_http_ [130.193.58.31](http://130.193.58.31/users)**
* **_http_ [v1ktorbro.students.nomoreparties.co](http://v1ktorbro.students.nomoreparties.co/users)**
* **_https_ [v1ktorbro.students.nomoreparties.co](https://v1ktorbro.students.nomoreparties.co/users)**

## Используемый стэк :

**express.js, MongoDB, API REST, Yandex.Cloud**

## Публичные маршруты  
1./signup регистрация пользователя в базе. 
POST запрос, в теле которого должно быть 2 поля: email и password;
2./signin авторизация юзера.
POST запрос, в теле которого должно быть 2 поля: email и password.

### Запросы

**_для карточек_**

      REST      |      Route         |         BODY          |  Result

      GET       |      '/cards'      |                       | список всех карточек;
      POST      |      '/cards'      |      name, link       | создать карточку;
      DELETE    |     '/cards/:id'   |                       | удалить карточку;
      PUT       | '/cards/:id/likes' |                       | поставить лойс карточке;
      DELETE    | '/cards/:id/likes' |                       | удалить лойс у карточки.


**_для юзеров_**

      REST      |      Route         |         BODY          |  Result

      GET       |    '/users'        |                       |  список всех пользователей;
      GET       |    '/users/:id'    |                       |  посмотреть данные пользователя с id...;
      PATCH     |    '/users/me'     |      name, about      |  отредактировать информацию полей: имя, о себе;
      PATCH     |  '/users/avatar'   |      link             |  изменить аватар пользователя.
      


### Структура проекта

        controllers/     | обработчики карточек и юзеров;
        errors/ | конструкторы ошибок со статусами 400, 401, 404,;
        middlewares/   | логгеры запросов и аунтефикация пользователя;
        models/      | схема модели карточки и юзера;
        routes/     | маршруты;
        .env      | генерация токена и его хранение в переменной окружения;
        error.log/     | логи ошибок;
        request.log     | логи запросов.

#### Немного о проекте

Руты карточек и пользователей защищены авторизацией. 
Авторизация заключается в сохранении JWT токена в куках браузера и защитой его сгенерированным модулем [crypto](https://www.npmjs.com/package/crypto-js) 32байтным ключем шифрования, который хранится в переменной окружения в файле [.env](https://www.npmjs.com/package/dotenv)

### Авторы

* **Яндекс.Практикум** *гуру и наставник* - [Yandex.Practikum](https://praktikum.yandex.ru);

* **Виктор Абросимов** *писарь* - [linkedin](https://www.linkedin.com/in/victor-abrosimov-631b6b1a4/).
