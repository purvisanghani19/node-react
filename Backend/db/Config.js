
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/e-com");

// const connectdb =async()=>{
   
//     const productSchema = new mongoose.Schema({});
//     const product = mongoose.model('products',productSchema);
//     const data = await product.find();
//     console.log('data', data);
    
// }
// connectdb();