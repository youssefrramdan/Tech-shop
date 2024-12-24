import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';

export default function Register() {
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function registerSubmit(values) {
    setIsLoading(true);
    try {
      const res = await axios.post(`https://gcm.onrender.com/api/auth/signup`, values);

      if (res.data.message === 'Registration successful') {
        navigate('/login'); // Redirect to login after successful registration
      }
    } catch (error) {
      if (error.response) {
        setErrMsg(error.response.data.message || 'Registration failed due to server error');
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
    name: Yup.string().min(3).max(10).required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{11}$/, 'Phone number must be 11 digits').required('Phone number is required'),
    password: Yup.string()
      .matches(/^[A-Z][a-zA-Z0-9]{6,}$/, 'Password must start with an uppercase letter and be at least 6 characters long')
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], "Passwords don't match")
      .required('Please confirm your password'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <div className="w-75 mx-auto py-5">
      {isLoading && (
        <Audio height="20" width="80" color="white" ariaLabel="loading" />
      )}
      <h3>Register Now</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          className="form-control mb-2"
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name && <div>{formik.errors.name}</div>}

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

        <label htmlFor="phone">Phone:</label>
        <input
          className="form-control mb-2"
          id="phone"
          name="phone"
          type="tel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.errors.phone && formik.touched.phone && <div>{formik.errors.phone}</div>}

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

        <label htmlFor="rePassword">Confirm Password:</label>
        <input
          className="form-control mb-2"
          id="rePassword"
          name="rePassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rePassword}
        />
        {formik.errors.rePassword && formik.touched.rePassword && <div>{formik.errors.rePassword}</div>}

        {errMsg && <div>{errMsg}</div>}

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
