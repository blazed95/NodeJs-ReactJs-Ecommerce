const mongoose = require("mongoose");
const itemsToCartSchema = mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    image: {
        type: String,
        required: [true, "Please include the product image"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity can not be less then 1.']
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        required: [true, "Please include the product size"]
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})


const cartSchema = mongoose.Schema({
    items: [itemsToCartSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart