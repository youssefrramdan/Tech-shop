import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import './Register.module.css';

export default function Register() {
  const [errMsg, setErrMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function registerSubmit(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://gcm.onrender.com/api/signup`,
        values
      );

      if (response.data.message === 'Registration successful') {
        setIsSuccess(true);
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setErrMsg('Something went wrong!');
      }
    } catch (error) {
      setErrMsg(error.response?.data?.message || 'Registration failed!');
    } finally {
      setIsLoading(false);
    }
  }

  // Validation schema
  const phoneRegExp = /^[0-9]{11}$/;
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(10, 'Name cannot exceed 10 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number must be 11 digits')
      .required('Phone number is required'),
    password: Yup.string()
      .matches(/^[A-Z][a-zA-Z0-9]{6,}$/, 'Password must start with a capital letter and be at least 6 characters')
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
      {isSuccess && (
        <div
          style={{ backgroundColor: '#0aad0a' }}
          className="alert alert-success text-center"
        >
          Congratulations! Your account has been created.
        </div>
      )}
      <h3>Register Now</h3>
      <form
        className="shadow p-5 m-auto rounded-4"
        onSubmit={formik.handleSubmit}
      >
        {/* Name Field */}
        <label htmlFor="name">Name:</label>
        <input
          className="form-control mb-2"
          type="text"
          id="name"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name && (
          <div className="alert p-2 mt-2 alert-danger">
            {formik.errors.name}
          </div>
        )}

        {/* Email Field */}
        <label htmlFor="email">Email:</label>
        <input
          className="form-control mb-2"
          type="email"
          id="email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <div className="alert p-2 mt-2 alert-danger">
            {formik.errors.email}
          </div>
        )}

        {/* Phone Field */}
        <label htmlFor="phone">Phone:</label>
        <input
          className="form-control mb-2"
          type="tel"
          id="phone"
          name="phone"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        {formik.errors.phone && formik.touched.phone && (
          <div className="alert p-2 mt-2 alert-danger">
            {formik.errors.phone}
          </div>
        )}

        {/* Password Field */}
        <label htmlFor="password">Password:</label>
        <input
          className="form-control mb-2"
          type="password"
          id="password"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && (
          <div className="alert p-2 mt-2 alert-danger">
            {formik.errors.password}
          </div>
        )}

        {/* Confirm Password Field */}
        <label htmlFor="rePassword">Confirm Password:</label>
        <input
          className="form-control mb-2"
          type="password"
          id="rePassword"
          name="rePassword"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.rePassword}
        />
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div className="alert p-2 mt-2 alert-danger">
            {formik.errors.rePassword}
          </div>
        )}

        {/* Error Message */}
        {errMsg && (
          <div className="alert p-2 mt-2 alert-danger">{errMsg}</div>
        )}

        {/* Submit Button */}
        {isLoading ? (
          <button className="btn bg-main text-white mt-2" type="button">
            <Audio
              height="20"
              width="80"
              color="white"
              ariaLabel="audio-loading"
            />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="btn bg-main text-white mt-2"
          >
            Register
          </button>
        )}
      </form>
    </div>
  );
}
