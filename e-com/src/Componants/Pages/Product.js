import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  const SearchProduct = async (e) => {
    console.warn(e.target.value);
    let key = e.target.value;
    if (key) {
      const SearchPro = await axios.get(`http://localhost:5000/search-product/${key}`);
      console.log('SearchPro', SearchPro);
      if (SearchPro) {
        setGetProduct(SearchPro.data);
      }
    } else {
      getProductData();
    }

  }



  return (
    <>
      <div className='container mt-5'>
        <input type="text" className="form-control" placeholder="Search Product through name" onChange={SearchProduct} aria-label="Search-Product" aria-describedby="basic-addon1" />
        <table className="table mt-4 border ">
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
              getProduct.length > 0 ? getProduct?.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.company}</td>
                  <td>{item.catagory}</td>
                  <td>{item.price}</td>
                  <td><Link to={"/update/" + item._id}><i className="bi bi-pencil-square"></i></Link></td>
                  <td><i className="bi bi-trash3" onClick={() => DeleteProduct(item._id)}></i></td>
                </tr>
              )
              ) : <td colspan="6" className='text-center'><h1 >No data found</h1></td>
            }

          </tbody>
        </table>
      </div>

    </>
  )
}

export default Product
