const mongoose = require('mongoose');
const User = require('./User');

const Walletschema = mongoose.Schema({
  dana: { type: Number, default: 0 },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Wallet', Walletschema);
