const router = require("express").Router();
const stripe = require('./stripe')

router.post('/stripe/charge', stripe.postCharge)

module.exports = router;