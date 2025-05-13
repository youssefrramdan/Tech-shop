import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { AUTH_ENDPOINTS } from "../../utils/apiConfig";
import "./Login.css";

export default function Login() {
  const { setUserToken, getUserData } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const loginSubmit = async (values) => {
    setIsLoading(true);
    setErrMsg("");

    try {
      const response = await axios.post(AUTH_ENDPOINTS.LOGIN, values);

      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
        await getUserData();
        navigate("/");
      } else {
        setErrMsg(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrMsg(error.response.data.message);
      } else {
        setErrMsg("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h2>Welcome Back!</h2>
          <p>Please sign in to continue</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="login-form">
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

          <div className="form-options">
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          {errMsg && <div className="alert alert-danger">{errMsg}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
