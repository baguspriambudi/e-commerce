const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  descriptions: { type: String, required: true },
  stock: { type: Number, required: true },
  merchant: { type: mongoose.Types.ObjectId, required: true, ref: 'Merchant' },
});

module.exports = mongoose.model('Product', productSchema);
