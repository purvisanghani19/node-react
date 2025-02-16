const express = require("express");
const cors = require('cors')

require("./db/Config");
const User = require('./db/User')
const Product = require("./db/Product");


const app = express();
app.use(express.json())
app.use(cors());


app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    console.log('result obj', result);
    delete result.password;
    res.send(result)
})


app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            res.send(user);
        } else {
            res.send({ result: "data not found" });
        }
    } else {
        res.send({ result: "please enter all required fields" });
    }
})

app.post('/add-product', async (req, res) => {
    let product = new Product(req.body)
    let result = await product.save();
    res.send(result)
})

app.get("/get-products", async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "no product found" })
    }
})

app.delete("/delete-product/:id", async (req, res) => {
    const product = await Product.deleteOne({ _id: req.params.id });
    res.send(product)
})

app.get("/get-single-product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "no record found" })
    }
})

app.put('/update-product/:id', async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set:req.body
        }
    )
    res.send(result)
})

app.get("/search-product/:key",async(req,res)=>{
    const result =await Product.find(
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {company:{$regex:req.params.key}}
            ]
        });
        if(result){
            res.send(result)
        }else{
            res.send({result:"no redord found"})
        }
})

app.listen(5000);