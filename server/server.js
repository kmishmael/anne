const port = 8080;
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
//const Client  = require('mongodb').MongoClient
const app = express();
const router = express.Router();
const db = require("./app/models/posts");
const dbConfig = require("./app/config/db.config");
var routes = require('./app/routes/routes')

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


routes(app);

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

app.listen(port, function () {
    console.log("Runnning on " + port);
});

