const path = require('path');
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
//const postCharge = require('./stripe')
const mongoose = require('mongoose')
const helmet = require("helmet");

const app = express();
app.use(helmet());
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
//app.use('/api', router) // Mount the router to the app /api
app.use('/uploads', express.static("uploads"));
app.use(express.json());
//This is a middleware function with no mount path. The function is executed every time the app receives a request.
app.use((req, res, next) => {
    //Enable CORS for all requests
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    //it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
    next() //It passes control to the next matching route. 

})
app.use(cors({
    origin: true,
    credentials: true,
}));


require("./config-server/mongoose.js")(app); //Adding this will connect to our database when ever our Nodejs server is running.
require('./routerHandler')(app)
require('dotenv').config()
/*router.post('/stripe/charge', postCharge) ///the stripe/charge is the endpoint and the postCharge handles the requests to this route
router.all('*', (_, res) =>
    res.json({ message: 'please make a POST request to /stripe/charge' })
)
*/
app.get('/', (req, res) => {
    res.json({
        message: 'Waaas up buddy. Welcome to my Eshop'
    });
});



//app.use(express.urlencoded());
//Build
/*app.use(express.static(path.join(__dirname, '../build'))) // Example: var x = path.join('Users', 'Refsnes', 'demo_path.js'); ---- console.log(x) = Users\Refsnes\demo_path.js


// This will serve the frontend in production.
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'))  //handle all GET requests by serving the index.html file located in the /build folder
})*/

app.listen(port, () => console.log(`Server running on port ${port}`))