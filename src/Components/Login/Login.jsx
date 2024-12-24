import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  const { setUserToken, getUserData } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [navigate]);

  async function loginSubmit(values) {
    setIsLoading(true);

    try {
      const res = await axios.post(`https://gcm.onrender.com/api/auth/signin`, values);

      if (res.data.message === 'Success login') {
        localStorage.setItem('userToken', res.data.token);
        setUserToken(res.data.token);
        getUserData();
        navigate('/'); // Redirect to home
      }
    } catch (error) {
      if (error.response) {
        setErrMsg(error.response.data.message || 'Login failed due to server error');
      } else if (error.request) {
        setErrMsg('No response was received');
      } else {
        setErrMsg('Error setting up the request');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Z][a-zA-Z0-9]{6,}$/, 'Password must start with an uppercase letter and be at least 6 characters long')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <div className='w-75 mx-auto py-5'>
      {isLoading && (
        <Audio height="20" width="80" color="white" ariaLabel="loading" />
      )}
      <h3>Login Now</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          className="form-control mb-2"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}

        <label htmlFor="password">Password:</label>
        <input
          className="form-control mb-2"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}

        {errMsg && <div>{errMsg}</div>}

        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
}
