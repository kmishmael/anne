const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const app = express();
const db = require("./app/models/posts.model");
const dbConfig = require("./app/config/db.config");
var routes = require('./app/routes/app.routes')

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var url = dbConfig.url;

mongoose.connect(url,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database");
})
    .catch(err => {
    console.log("Cannot connect to database!", err);
});

app.get("/", (req, res, next) => {
    res.json({ message: "Test Message" });
});


app.listen(8080, function () {
    console.log("Runnning on 8080" );
});


module.exports = app;