import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from '../../Context/UserContext';
import { cartContext } from '../../Context/CartContext';

export default function Navbar() {
  let { userToken, setUserToken, userData } = useContext(UserContext);
  const { numOfCartItems } = useContext(cartContext);
  let navigate = useNavigate();

  function Logout() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} className='svg ms-0' alt="logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userToken !== null ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" end>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/products">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/categories">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/brands">
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item position-relative">
                  <NavLink className="nav-link" to="/cart">
                    Cart
                  </NavLink>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {numOfCartItems ? numOfCartItems : ''}
                  </span>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/allorders">
                    All Orders
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/wishlist">
                    <i className="fa-regular fa-heart"></i>
                  </NavLink>
                </li>
              </>
            ) : (
              ''
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-5 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className="fab fa-facebook mx-2"></i>
              <i className="fab fa-twitter mx-2"></i>
              <i className="fab fa-instagram mx-2"></i>
              <i className="fab fa-tiktok mx-2"></i>
              <i className="fab fa-youtube mx-2"></i>
            </li>
            {userToken !== null ? (
              <>
                <li className="nav-item mt-3 me-2">
                  <p>Hi {userData?.name}</p>
                </li>
                <li className="nav-item mt-2">
                  <span onClick={Logout} className="nav-link cursor-pointer">
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
