const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    descriptions: { type: String, required: true },
    stock: { type: Number, required: true }
})

module.exports = mongoose.model('Product', productSchema)