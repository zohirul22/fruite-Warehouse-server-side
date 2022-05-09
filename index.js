const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
require('dotenv').config();
const app = express();

const port = process.env.port||5000;


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DV_USER}:${process.env.DV_PASSWORD}@cluster0.d4waz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
    await client.connect();
    const catagoriCollection =client.db('fruitWarehouse').collection('catagori');
  
    app.get('/catagori' ,async(req ,res) =>{
        const query ={};
        const cursor =catagoriCollection.find(query);
        const cetagoris =await cursor.toArray();
        res.send(cetagoris);
    });


    const catagoriCollection2 =client.db('fruitWarehouse2').collection('review');
  
    app.get('/review' ,async(req ,res) =>{
        const query ={};
        const cursor =catagoriCollection2.find(query);
        const reviews =await cursor.toArray();
        res.send(reviews);
    });

app.delete('/review/:id' , async(req,res)=>{
  const id =req.params.id;
  const query ={_id:ObjectId(id)}
  const result =await catagoriCollection2.deleteOne(query);
  res.send(result)
   
})





app.get('/catagori/:id' ,async(req,res ) =>{
  const id =req.params.id;
  const query ={_id:ObjectId(id)};
  const catagori =await catagoriCollection.findOne(query);
  res.send(catagori)
})



}

finally{

}
}

run().catch(console.dir)


app.get('/', (req, res) => {
  res.send('Hello assignment!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})