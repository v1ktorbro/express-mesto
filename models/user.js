const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: [true, 'Введите ссылку в формате http(s)://'],
    validate: {
      validator(value) {
        return /https?:\/{2}\S+/gi.test(value);
      },
      message: (props) => {
        return `Ссылка ${props.value} введена не верна.`;
      },
    },
  },
});

module.exports = mongoose.model('user', userSchema);
