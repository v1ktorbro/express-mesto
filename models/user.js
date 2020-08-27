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
    required: true,
    validate: {
      validator(value) {
        return value !== /https?:\/{2}\S+/gi;
      },
      message: 'Ссылка должна иметь такой формат: http(s)://....',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
