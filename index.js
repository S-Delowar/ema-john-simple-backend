const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const port = 3000

const app = express();
app.use(cors());
app.use(bodyParser.json()) 

const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });

//get
app.get('/products', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("products session")
    client.connect(error => {
        const collection = client.db("onlineStore").collection("products");
        collection.find().toArray((err, documents) => {
            if(err){
                console.log(err)
            }
            else{
                console.log(documents)
                res.send(documents);
            }
        })
        //client.close();
    });

})





//post
app.post('/addProduct', (req, res) => {
    const product = req.body;
    console.log(product);
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(error => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product, (err, result) => {
            if(err){
                console.log(err)
		res.status(500).send({message:err})
            }
            else{
                res.send(result.ops[0]); 
            }
        })
        //client.close();
    });   
})



// app.get('/', (req, res) => {
//     const product = {
//         name: 'Camera',
//         price: '45000',
//         stock: '11'
//     }
//     res.send(product)
// });

// app.get('/fruits/apple', (req, res) => {
//     res.send({fruit: 'apple', price:'500'})
// })

 const users = ['sayed', 'joy', 'rasel', 'juel']
 app.get('/users/:id', (req,res)=> {
     const id = req.params.id;
     const name = users[id];
     console.log({id, name});
     res.send({id, name})
 })

// //Post:
// app.post('/addUser', (req, res) => {
//     console.log('data received', req.body);
//     //(save to database)
//     const user = req.body;
//     user.id = 22;
//     res.send(user);
// })

app.listen(port, () => console.log(`index.js listening at http://localhost:${port}`))