const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;
const passport = require("passport");
const path = require('path')


// Define middleware here
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    // Add routes, both API and view
    app.use(routes);
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
}

else {
    app.use(express.static(path.join(__dirname, '/client/public')));
    // Add routes, both API and view
    app.use(routes);
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "./client/public/index.html"));
    });
}

// mongoose connection
try {
    // mongodb+srv://know-user:<password>@cluster0.or9iw.mongodb.net/CRM?retryWrites=true&w=majority
    // mongodb://127.0.0.1:27017/CRM
    mongoose.connect("mongodb+srv://crm:crm@cluster0.or9iw.mongodb.net/CRM?retryWrites=true&w=majority", {
    });
    const db = mongoose.connection;
    db.on("error", (error) => {
        console.log(error);
    });
    db.once("open", function () {
        console.log("Connected successfully");
    });
} catch (error) {
    console.log('---------- ERROR -----------', error);
}

// Passport config
app.use(passport.initialize());
require("./config/passport")(passport);


const server = require('http').Server(app)
const io = require('socket.io')(server);

io.on('connection', (client) => {
    client.on('new message', (messageData) => {
        io.emit('message', messageData)
    })
    client.on('messages checked', (user) => {
        io.emit('refresh')
    })
});

// Start the API server
server.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});