import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./nav.css";



const Navbar = () => {
  const auth = localStorage.getItem('userdata');
  const navigate = useNavigate();


  let name = '';
  let firstLetter = '';

  if (auth) {
    const userData = JSON.parse(auth);
    if (userData && userData.name) {
      name = userData.name;
      firstLetter = name.charAt(0);
    }
  }

  

  const logout = () => {
    localStorage.clear();
    navigate('/register')
  }
  return (
    <>
      <div>
        <ul className='nav-ul'>
          {
            auth ? (
              <>
                <div>
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
                    <NavLink onClick={logout} to='/login'>logout</NavLink>
                  </li>

                </div>
                <div>

                  <li className='nav-user-name'  >
                    {firstLetter}
                  </li>
                </div>
              </>
            ) : (
              <>

                <div>
                  <li>
                    <NavLink to='/register'>register</NavLink>
                  </li>
                  <li>
                    <NavLink to='/login'>login</NavLink>
                  </li>
                </div>


              </>
            )

          }

        </ul>
      </div>
    </>
  )
}

export default Navbar
