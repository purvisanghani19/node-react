import axios from 'axios';
import React, { useState } from 'react'

const AddProduct = () => {
  const auth = localStorage.getItem('userdata');
  const userdata = JSON.parse(auth)
  const [Product, setProduct] = useState({
    name: "",
    price: "",
    catagory: "",
    userId:userdata?._id,
    company: ""
  })

  console.log('Product', Product);


  const handleProduct = (e) => {
    const { name, value } = e.target
    setProduct({ ...Product, [name]: value });
  }

  const addproduct = async (e) => {
    e.preventDefault();

    try {
      let result = await axios.post("http://localhost:5000/add-product",Product);
      console.log('result', result);
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>

      <form className='container-sm mt-5' style={{ width: "406px" }}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={Product.name} onChange={handleProduct} id="exampleInputEmail1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">price</label>
          <input type="text" className="form-control" name="price" value={Product.price} onChange={handleProduct} id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">catagory</label>
          <input type="text" className="form-control" name="catagory" value={Product.catagory} onChange={handleProduct} id="exampleInputcatagory" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">company</label>
          <input type="text" className="form-control" name="company" value={Product.company} onChange={handleProduct} id="exampleInputcompnay" />
        </div>

        <button onClick={addproduct} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default AddProduct
