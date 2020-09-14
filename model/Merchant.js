const mongoose = require('mongoose');
const User = require('./User');

const Merchantschema = mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  name_bank: { type: String, required: true },
  rekening: { type: String, required: true },
});

module.exports = mongoose.Model('Merchant', Merchantschema);
