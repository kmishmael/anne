/*
const app = require('./server/index');
const express = require('express')

app = express();
*/


const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
//const Client  = require('mongodb').MongoClient
const app = express();
//const router = express.Router();
const dbConfig = require("./server/app/config/db.config");
var routes = require('./server/app/routes/app.routes');

const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//routes("api/", app);

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

app.use(express.static(__dirname + '/dist/anne'));

app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname+'/dist/anne/index.html'));
});

app.listen(process.env.PORT || 8080)