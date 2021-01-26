const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config() 

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qemdz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;



const app = express()
app.use(cors());
app.use(bodyParser.json());


const port = 5000;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const CreativeAgency = client.db("CreativeAgency").collection("CreativeAgencyReview");

app.post('/order', (req, res) => {
  const data = req.body; 
  CreativeAgency.insertOne(data)
  .then((result) => {
    console.log('updated')
  })
})

app.post('/serviceList', (req, res) => { 
  CreativeAgency.find({email : req.body.email})
  .toArray((err, documents) => {    
    res.send(documents)
  }) 
})

 
app.post('/review', (req, res) => {
  const data = req.body; 
  CreativeAgency.insertOne(data)
  .then((result) => {
    console.log('updated two')
  })
})


app.get('/', (req, res) => {
  res.send("Programming Hero show via node.js")
})

 
    
console.log('connect') 
});

app.listen(process.env.PORT || port) 