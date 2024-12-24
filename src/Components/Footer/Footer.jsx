import React from "react";
import "./Footer.css"; // ملف CSS مخصص

export default function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* قسم معلومات الموقع */}
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p className="text-muted">
              Welcome to TechSphere! Your one-stop shop for the best electronics and gadgets.
            </p>
          </div>

          {/* قسم الروابط */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-white text-decoration-none">
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/about" className="text-white text-decoration-none">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* قسم وسائل التواصل الاجتماعي */}
          <div className="col-md-4 mb-3 text-center">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* حقوق الطبع */}
        <div className="text-center mt-3">
          <p className="text-muted">
            &copy; {new Date().getFullYear()} TechSphere. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
