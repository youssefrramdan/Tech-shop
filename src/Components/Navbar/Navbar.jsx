import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { cartContext } from "../../Context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { userToken, userData, logoutUser } = useContext(UserContext);
  const { numOfCartItems } = useContext(cartContext);
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light electronimax-navbar sticky-top py-3 shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="ElectroniMax Logo"
            height="36"
            className="me-2 electronimax-logo"
          />
          <span className="fw-bold electronimax-title">ElectroniMax</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link text-dark" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark" to="/categories">
                Categories
              </NavLink>
            </li>
            <li className="nav-item position-relative">
              <NavLink className="nav-link text-dark" to="/cart">
                Cart
              </NavLink>
              {numOfCartItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
                  {numOfCartItems}
                </span>
              )}
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark" to="/allorders">
                All Orders
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {userToken ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-dark">
                    Hi, {userData?.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-logout ms-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="btn btn-primary text-white me-2"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="btn btn-outline-primary" to="/register">
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
