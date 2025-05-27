const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: { type: String, default: 'Анонимен' },
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);