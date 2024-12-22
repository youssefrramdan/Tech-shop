import React, { useContext, useState } from 'react';
import Style from "./Login.module.css";
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  const { setUserToken, getUserData } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function loginSubmit(values) {
    setErrMsg(''); // Clear previous error messages
    setIsLoading(true); // Set loading to true during the API call

    try {
      const res = await axios.post(`https://gcm.onrender.com/api/signin`, values);

      if (res.data.message === 'Success login') {
        localStorage.setItem('userToken', res.data.token); // Save token to localStorage
        setUserToken(res.data.token); // Update UserContext
        getUserData(); // Fetch user data
        setIsSuccess(true); // Show success message
        setTimeout(() => {
          navigate('/'); // Redirect to home after 1 second
        }, 1000);
      }
    } catch (error) {
      setErrMsg(error.response?.data?.message || 'Login failed'); // Display backend error or default message
    } finally {
      setIsLoading(false); // End loading state
    }
  }

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Z][a-zA-Z0-9]{6,}$/, 'Password must start with an uppercase letter and be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <div className='w-75 mx-auto py-5'>
      {/* Success Message */}
      {isSuccess && <div style={{ backgroundColor: "#0aad0a" }} className='alert alert-success text-center'>Login Successful! Redirecting...</div>}

      <h3>Login Now</h3>
      <form className='shadow p-5 m-auto rounded-4' onSubmit={formik.handleSubmit}>
        {/* Email Field */}
        <label htmlFor="email">Email :</label>
        <input
          className='form-control mb-2'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          id='email'
          name='email'
        />
        {formik.errors.email && formik.touched.email && (
          <div className='alert p-2 mt-2 alert-danger'>{formik.errors.email}</div>
        )}

        {/* Password Field */}
        <label htmlFor="password">Password :</label>
        <input
          className='form-control mb-2'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          id='password'
          name='password'
        />
        {formik.errors.password && formik.touched.password && (
          <div className='alert p-2 mt-2 alert-danger'>{formik.errors.password}</div>
        )}

        {/* Error Message */}
        {errMsg && <div className='alert p-2 mt-2 alert-danger'>{errMsg}</div>}

        {/* Submit Button with Loading Spinner */}
        {isLoading ? (
          <button className='btn bg-main text-center text-white mt-2' type='button'>
            <Audio
              height="20"
              width="80"
              color="white"
              ariaLabel="audio-loading"
            />
          </button>
        ) : (
          <div className='d-flex align-items-center'>
            <button
              type='submit'
              disabled={!(formik.isValid && formik.dirty)}
              className='btn bg-main text-white mt-2 mx-2'
            >
              Login
            </button>
            <Link className='btn text-decoration-underline ' to={'/register'}>
              <span className='text-decoration-none'>If you don't have an account</span> Register Now
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}
