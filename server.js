require('dotenv').config();

const express= require('express')
const app =express()
const routes = require('./routes')
const port = process.env.PORT || 1337

//MongoDB stuff
var mongoose = require('mongoose');
var mongoDB = process.env.URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({
    extended: true
  }))

routes(app, db)
app.listen(port, () => {
    console.log('listening on port' + port);
    })