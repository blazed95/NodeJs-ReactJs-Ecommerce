const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret)
exports.postCharge = async (req, res) => {
    try {
        const { amount, source, receipt_email } = req.body
        /*
        const costomer = await stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        })
        */
        const charge = await stripe.charges.create({
            amount,
            description: "Sample Charge",
            currency: 'usd',
            source,
            receipt_email
        })

        if (!charge) throw new Error('charge unsuccessful')

        res.status(200).json({
            message: 'charge posted successfully',
            charge
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
