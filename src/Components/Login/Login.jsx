import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import "./Login.css";

export default function Login() {
  const { setUserToken, getUserData } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, [navigate]);

  async function loginSubmit(values) {
    setIsLoading(true);

    try {
      const res = await axios.post(`https://gcm.onrender.com/api/auth/signin`, values);

      if (res.data.message === "Success login") {
        localStorage.setItem("userToken", res.data.token);
        setUserToken(res.data.token);
        getUserData();
        navigate("/"); // Redirect to home
      }
    } catch (error) {
      if (error.response) {
        setErrMsg(error.response.data.message || "Login failed due to server error");
      } else if (error.request) {
        setErrMsg("No response was received");
      } else {
        setErrMsg("Error setting up the request");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-zA-Z0-9]{6,}$/, "Password must start with an uppercase letter and be at least 6 characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <div className="login-page">
      <div className="login-card p-5 shadow-lg rounded">
        <h3 className="text-center text-primary mb-4">Login</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              className={`form-control ${formik.errors.email && formik.touched.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              className={`form-control ${formik.errors.password && formik.touched.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter your password"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>
          {errMsg && <div className="alert alert-danger text-center">{errMsg}</div>}
          <button type="submit" className="btn btn-primary w-100">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/register" className="text-decoration-none">
            Don't have an account? <span className="text-primary">Register here</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
