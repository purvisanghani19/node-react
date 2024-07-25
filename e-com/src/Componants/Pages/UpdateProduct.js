import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [UpdatePro, setUpdatePro] = useState({
        name: "",
        price: "",
        catagory: "",
        userId: "",
        company: ""
    })

    const GetsingleData = async () => {
        try {
            const data = await axios.get(`http://localhost:5000/get-single-product/${id}`);
            // console.log('data', data);
            setUpdatePro({
                name: data.data.name,
                price: data.data.price,
                catagory: data.data.catagory,
                userId: data.data.userId,
                company: data.data.company
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetsingleData();
    }, [])



    const handleProduct = (e) => {
        const { name, value } = e.target
        setUpdatePro({ ...UpdatePro, [name]: value });
    }

    const UpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const UpdateData = await axios.put(`http://localhost:5000/update-product/${id}`, UpdatePro);
            console.log('UpdateData', UpdateData);
            setUpdatePro({
                name: "",
                price: "",
                catagory: "",
                userId: "",
                company: ""
            })
            if(UpdateData.data.acknowledged === true && UpdateData.status === 200){
                navigate('/');
            }else{
                console.log('UpdateData.status---------', UpdateData.status);
                alert("----error----")
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <form className='container-sm mt-5' style={{ width: "406px" }}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name"
                        value={UpdatePro.name}
                        onChange={handleProduct}
                        id="exampleInputEmail1" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">price</label>
                    <input type="number" className="form-control" name="price"
                        value={UpdatePro.price} onChange={handleProduct}
                        id="exampleInputPassword1" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">catagory</label>
                    <input type="text" className="form-control" name="catagory"
                        value={UpdatePro.catagory} onChange={handleProduct}
                        id="exampleInputcatagory" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">company</label>
                    <input type="text" className="form-control" name="company"
                        value={UpdatePro.company} onChange={handleProduct}
                        id="exampleInputcompnay" />

                </div>

                <button
                    onClick={UpdateProduct}
                    type="submit" className="btn btn-primary">Update Product</button>
            </form>
        </>
    )
}

export default UpdateProduct
