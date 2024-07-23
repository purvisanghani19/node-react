import React, { useEffect, useState } from 'react'
import axios from 'axios';


const Product = () => {
  const [getProduct, setGetProduct] = useState([])

  const getProductData = async () => {
    try {
      const getData = await axios.get("http://localhost:5000/get-products");
      // console.log('getData', getData);
      setGetProduct(getData.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProductData()
  }, [])

  const DeleteProduct = async (id) => {
    // console.log('id----', id);
    try {
      const deletepro = await axios.delete(`http://localhost:5000/delete-product/${id}`);
      // console.log('delete', deletepro);
      if (deletepro?.data?.acknowledged === true && deletepro?.data?.deletedCount === 1) {
        alert("product delete");
        setGetProduct((prevProducts) => prevProducts.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <table className="table container mt-5 border">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Company</th>
            <th scope="col">Catagory</th>
            <th scope="col">Price</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            getProduct?.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>{item.catagory}</td>
                <td>{item.price}</td>
                <td><i className="bi bi-pencil-square" onClick={() => UpdateProduct(item)} ></i></td>
                <td><i className="bi bi-trash3" onClick={() => DeleteProduct(item._id)}></i></td>
              </tr>
            )
            )
          }

        </tbody>
      </table>

    </>
  )
}

export default Product
