const mongoose = require("mongoose");
const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please include the product name"],
    },
    price: {
        type: Number,
        required: [true, "Please include the product price"],
    },
    desc: {
        type: String,
        required: [true, "Please include the product description"],
    },
    image: {
        type: String,
        required: [true, "Please include the product image"]
    },
    category: {
        type: String,
        enum: ['shoes', 'tshirt', 'hoodie', 'pants'],
        required: [true, "Please include the product category"],
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Item = mongoose.model("Item", itemSchema);
module.exports = Item
