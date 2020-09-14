const mongoose = require('mongoose');

const Userschema = mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  premium: {
    type: String,
    default: 'none',
    enum: ['accept', 'none', 'pending', 'reject'],
  },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
});

module.exports = mongoose.model('User', Userschema);
