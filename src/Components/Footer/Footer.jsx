import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container py-4">
        <div className="row">
          {/* Logo Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="footer-logo">TechSphere</h5>
            <p className="text-muted">Your ultimate destination for tech solutions and gadgets.</p>
            <div className="social-icons mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          {/* Documentation Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="footer-title">Documentation</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/">Getting Started</a>
              </li>
              <li>
                <a href="/">Components</a>
              </li>
              <li>
                <a href="/">API Playground</a>
              </li>
              <li>
                <a href="/">Pricing</a>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="footer-title">Resources</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/">Customers</a>
              </li>
              <li>
                <a href="/">Enterprise</a>
              </li>
              <li>
                <a href="/">Templates</a>
              </li>
              <li>
                <a href="/">Integrations</a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="footer-title">Company</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/">Careers</a>
              </li>
              <li>
                <a href="/">Blog</a>
              </li>
              <li>
                <a href="/">Public Roadmap</a>
              </li>
              <li>
                <a href="/">Security</a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="col-lg-3 col-md-12 mb-4">
            <h6 className="footer-title">Legal</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/">Privacy Policy</a>
              </li>
              <li>
                <a href="/">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-muted mb-0">
            &copy; {new Date().getFullYear()} TechSphere, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
