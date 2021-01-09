const Cart = require("./cartSchema");

exports.addItemToCart = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}

exports.cart = async () => {
    const cart = await Cart.find().populate({
        path: "items.itemId",
        select: "name price total"
    });;
    return cart[0];
};

