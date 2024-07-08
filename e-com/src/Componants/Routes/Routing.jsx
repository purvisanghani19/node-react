import { Route, Router, Routes } from "react-router-dom";
import Register from '../Auth/Register';
import PrivateRoute from "./PrivateRoute";
import Navbar from '../Navbar/Navbar';
import Product from "../Pages/Product";
import Error from "../Pages/Error";


const Routing = () => {
  return (
  <>
    <Navbar />
      <Routes>


        <Route element={<PrivateRoute/>}>
        <Route path="/" element={<Product/>} />
        <Route path="/add" element={<Navbar />} />
        <Route path="/update" element={<Navbar />} />
        <Route path="/profile" element={<Navbar />} />
        </Route>


        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Error />} />
      </Routes>

      {/* <Footer /> */}
  </>
  )
}

export default Routing
