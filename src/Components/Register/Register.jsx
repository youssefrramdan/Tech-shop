import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_ENDPOINTS } from "../../utils/apiConfig";
import "./Register.css";

export default function Register() {
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  async function registerSubmit(values) {
    setIsLoading(true);
    setErrMsg("");
    try {
      const res = await axios.post(AUTH_ENDPOINTS.REGISTER, values);
      if (res.data.message === "Registration successful") {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setErrMsg(
          error.response.data.message ||
            "Registration failed. Please try again."
        );
      } else if (error.request) {
        setErrMsg("Network error. Please check your internet connection.");
      } else {
        setErrMsg("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords don't match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <div className="register-container">
      <div className={`register-wrapper ${isVisible ? "visible" : ""}`}>
        <div className="register-header">
          <h2>Create Account</h2>
          <p>Join us and start shopping</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-group">
              <i className="fas fa-user input-icon"></i>
              <input
                id="name"
                name="name"
                type="text"
                className={`form-control ${
                  formik.errors.name && formik.touched.name ? "is-invalid" : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="Enter your full name"
              />
            </div>
            {formik.errors.name && formik.touched.name && (
              <div className="error-message">{formik.errors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-group">
              <i className="fas fa-envelope input-icon"></i>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-control ${
                  formik.errors.email && formik.touched.email
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your email"
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <div className="error-message">{formik.errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-group">
              <i className="fas fa-phone input-icon"></i>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={`form-control ${
                  formik.errors.phone && formik.touched.phone
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                placeholder="Enter your phone number"
              />
            </div>
            {formik.errors.phone && formik.touched.phone && (
              <div className="error-message">{formik.errors.phone}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <i className="fas fa-lock input-icon"></i>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  formik.errors.password && formik.touched.password
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter your password"
              />
              <i
                className={`fas ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } password-toggle`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="rePassword">Confirm Password</label>
            <div className="input-group">
              <i className="fas fa-lock input-icon"></i>
              <input
                id="rePassword"
                name="rePassword"
                type={showRePassword ? "text" : "password"}
                className={`form-control ${
                  formik.errors.rePassword && formik.touched.rePassword
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
                placeholder="Confirm your password"
              />
              <i
                className={`fas ${
                  showRePassword ? "fa-eye-slash" : "fa-eye"
                } password-toggle`}
                onClick={() => setShowRePassword(!showRePassword)}
              ></i>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="error-message">{formik.errors.rePassword}</div>
            )}
          </div>

          {errMsg && <div className="alert alert-danger">{errMsg}</div>}

          <button
            type="submit"
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i>
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
