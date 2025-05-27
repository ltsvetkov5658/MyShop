const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    shortDescription: String,
    fullDescription: String,
    price: Number,
    purchaseCount: { type: Number, default: 0 } // За да следим колко пъти е закупен
});

module.exports = mongoose.model('Product', productSchema);
