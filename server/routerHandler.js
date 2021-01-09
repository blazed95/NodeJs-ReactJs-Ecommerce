const itemRoutes = require("./Product/routes")
const cartRoutes = require("./Cart/routesCart")
const stripeRoutes = require("./Stripe/routesStripe")
module.exports = app => {
    app.use("/Items", itemRoutes);
    app.use("/Cart", cartRoutes)
    app.use("/api", stripeRoutes)

}