const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  weight: String,
  priceOld: Number,
  priceNew: { type: Number, required: true },
  status: { type: String, enum: ['Normal', 'On Sale', 'Special'], default: 'Normal' },
  description: String,
  image: String // This will store the file path or URL
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);