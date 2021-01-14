const mongoose = require("mongoose");
module.exports = app => {
    mongoose.connect(process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }).then(res => console.log("Conneceted in to Database")).catch(err => console.log(err))

    if (app) {
        app.set("mongoose", mongoose);
        console.log("1");
    }
};
function cleanup() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
}
