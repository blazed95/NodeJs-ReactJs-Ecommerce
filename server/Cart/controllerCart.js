const cartRepository = require('./repositoryCart')
const itemRepository = require('../Product/repository')

exports.addItemToCart = async (req, res) => {

    //console.log(req.body)
    try {
        const quantity = Number.parseInt(req.body.quantity);
        //console.log(quantity)
        const itemId = req.body.itemId;
        const size = req.body.size;
        let cart = await cartRepository.cart();
        let itemDetails = await itemRepository.itemById(itemId);
        if (!itemDetails) {
            return res.status(500).json({
                type: "Item not found",
                msg: "Invalid request"
            })
        }
        // If no cart---> Create New cart and add item
        if (!cart) {
            const cartData = {
                items: [{
                    itemId: itemId,
                    quantity: quantity,
                    size: size,
                    image: itemDetails.image,
                    price: itemDetails.price,
                    total: parseInt(itemDetails.price * quantity)
                }],
                subTotal: parseInt(itemDetails.price * quantity)
            }
            cart = await cartRepository.addItemToCart(cartData)
            res.json(cart);
        }
        // If already cart---> Add item to the cart
        else if (cart) {
            //check if item exists
            const indexFound = cart.items.findIndex(item => (item.itemId._id == itemId && item.size == size))
            console.log(indexFound)
            //console.log(indexFound)
            //If the item is not already in the cart... then add the quantity of it in the cart
            if (indexFound === -1 & quantity >= 1) {
                console.log("If the item is not already in the cart... then add the quantity of it in the cart")
                cart.items.push({
                    itemId: itemId,
                    quantity: quantity,
                    size: size,
                    price: itemDetails.price,
                    image: itemDetails.image,
                    total: parseInt(itemDetails.price * quantity)
                })
                cart.subTotal = cart.items.map(item => item.total).reduce((accumulator, currentValue) => accumulator + currentValue);

            }
            //This case removes an item from the the cart if the quantity is set to zero
            else if (indexFound > -1 && quantity == -1 && cart.items[indexFound].quantity <= 1) {
                console.log("deleteeed")
                cart.items.splice(indexFound, 1) //Remove 1 element at index {indexFound}
                if (cart.items.length == 0) {
                    subTotal = 0;
                }
                else {
                    //here we sum the current items in the cart--- with a reducer function
                    cart.subTotal = cart.items.map(item => item.total).reduce((accumulator, currentValue) => accumulator + currentValue);
                }
            }


            /// Check if item exist, and  add the previous quantity with the new quantity and update the total price-------
            else if (indexFound > -1 && cart.items[indexFound].size == size) {
                cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                cart.items[indexFound].price = itemDetails.price;
                cart.items[indexFound].total = cart.items[indexFound].quantity * itemDetails.price;
                cart.items[indexFound].subtotal = cart.items.map(item => item.total).reduce((accumulator, currentValue) => accumulator + currentValue);
                cart.subTotal = cart.items.map(item => item.total).reduce((accumulator, currentValue) => accumulator + currentValue);
            }
            else if (indexFound > -1 && cart.items[indexFound].size != size) {
                console.log('different size')
                cart.items.push({
                    itemId: itemId,
                    quantity: quantity,
                    size: size,
                    price: itemDetails.price,
                    image: itemDetails.image,
                    total: parseInt(itemDetails.price * quantity)
                })
                cart.subTotal = cart.items.map(item => item.total).reduce((accumulator, currentValue) => accumulator + currentValue);

            }
            else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid Request"

                })
            }

            //if evrything went good with no errors then
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                msg: "Process Succesful",
                data: data
            })

        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "invalid",
            msg: "Something went wrongggg",
            err: err
        })
    }
}


exports.getCart = async (req, res) => {
    try {
        let cart = await cartRepository.cart()
        if (!cart) {
            return res.status(400).json({
                type: "Invalid",
                msg: "Cart not found"
            })
        }
        return res.status(200).json({
            status: true,
            data: cart
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}



exports.emptyCart = async (req, res) => {
    try {
        let cart = await cartRepository.cart();
        cart.items = [];
        cart.subTotal = 0;
        let data = await cart.save();
        res.status(200).json({
            status: true,
            msg: "Cart is Empty",
            data: data
        })
    }
    catch (err) {
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })

    }
}





