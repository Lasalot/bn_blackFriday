const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const { lookup } = require('geoip-lite');

const app = express();

app.unsubscribe(bodyParser.urlencoded({extended:true}))
app.unsubscribe(bodyParser.json())

mongoose.connect('mongodb://'+ process.env.DATABASE +'/Subscribers', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function(error) {
  if (error) console.log(error)
  console.log("DB connected")
})


let Schema = mongoose.Schema
let emailSchema = new Schema ({
  email: String,
  currDate: Date,
  ip: String,
})

const Model = mongoose.model
const Subscriber = Model ('Subscribers', emailSchema)

app.get('/', (req,res) => {
let queryEmail = req.query.email
const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
let signup = new Subscriber ({
  email: queryEmail,
  currDate: new Date(),
  ip: ip
})
signup.save().then(res.redirect('https://'+process.env.TARGET+'/?flag=blackfriday&email=' + queryEmail))

})

app.listen(process.env.PORT || 3000)