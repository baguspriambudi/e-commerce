const mongoose = require('mongoose');

const transaksischema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  pembeli: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  tgl: { type: Date, required: true },
  qty: { type: Number },
});

module.exports = mongoose.model('Transaksi', transaksischema);
