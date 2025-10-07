// models/orderModel.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, { _id: false }); // _id is not needed for subdocuments here

const orderSchema = new mongoose.Schema({
    // We use the frontend's numeric user ID for simplicity in this example.
    // In a full-fledged app, this would likely be a mongoose.Schema.Types.ObjectId ref.
    userId: { type: Number, required: true, index: true },
    date: { type: Date, required: true, default: Date.now },
    total: { type: Number, required: true },
    items: [orderItemSchema],
});

// Mongoose automatically adds a unique `_id` field to each order document.
// The frontend can use this `_id` as the unique order ID. We will alias it to `id`.
orderSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;