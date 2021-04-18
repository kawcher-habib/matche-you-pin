const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()




app.use(cors())
app.use(bodyParser.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ujyge.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req,res) => {
    console.log(req)
    res.send('hello this is working')

})

client.connect(err => {
  const serviceCollection = client.db("serviceToper").collection("serviceProduct");
  app.post('/addService', (req,res) =>{
      console.log(req.body)
      
     serviceCollection.insertMany(req.body)
     .then(result=>{
            console.log('this is working',result)
     })
    
  })
 
 
});

 app.listen(5000);