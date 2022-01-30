const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 8080;
const dbConfig = require("./server/app/config/db.config");
var routes = require('./server/app/routes/app.routes');

const path = require('path');

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

app.use(express.static(__dirname + '/dist/anne'));

app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname+'/dist/anne/index.html'));
});


app.listen(port, () => {
    console.log("Listening on Port ", port);
})