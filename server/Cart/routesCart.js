const router = require("express").Router();

const controllerCart = require("./controllerCart")

router.post("/", controllerCart.addItemToCart);
router.get("/", controllerCart.getCart);
router.delete("/empty-cart", controllerCart.emptyCart);
module.exports = router;

