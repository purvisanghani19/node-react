import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./nav.css";



const Navbar = () => {
  const auth = localStorage.getItem('userdata');
  const navigate = useNavigate();

  const logout=()=>{
    localStorage.clear();
    navigate('/register')

  }
  return (
    <>
      <div>
        <ul className='nav-ul'>
          <li>
            <NavLink to='/'>product</NavLink>
          </li>
          <li>
            <NavLink to='/add'>add product</NavLink>
          </li>
          <li>
            <NavLink to='/update'>update product</NavLink>
          </li>

          <li>
            <NavLink to='/profile'>user</NavLink>
          </li>
          <li>
            {
              auth ?  <NavLink  onClick={logout} to='/register'>logout</NavLink> : <NavLink to='/register'>register</NavLink>
            }
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
