const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { lookup } = require('geoip-lite');
const axios = require('axios')

const app = express();

app.unsubscribe(bodyParser.urlencoded({extended:true}))
app.unsubscribe(bodyParser.json())


app.get('/bf', (req,res) => {
let queryEmail = req.query.email
const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

axios.get(process.env.INTEGRO,{
  params: {
    email: queryEmail,
    ip: ip,
    currDate: new Date()
  }
}).then(function(res){console.log(res)}).catch(err => console.log(err)).then(res.redirect('https://'+process.env.TARGET+'/?flag=blackfriday&email=' + queryEmail))
})
app.listen(process.env.PORT || 3000)
//Author: Taki

