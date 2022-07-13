new window.JustValidate('#form', {
  rules: {
    email: {
      required: true,
      email: true
    }
  },
  messages: {
    email: {
      required: 'Обязательное поле!',
      email: 'Email не корректен!'
    }
  },
});

new window.JustValidate('.section-contacts__form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 15,
    },
    email: {
      required: true,
      email: true
    }
  },
  messages: {
    name: {
      required: 'Обязательное поле!',
      minLength: 'Слишком кроткое имя!',
      maxLength: 'Максимальное количество букв -15!',
    },
    email: {
      required: 'Обязательное поле!',
      email: 'Email не корректен!'
    }
  },
});
