import React, { useState } from 'react'
import Style from "./Register.module.css"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.module.css'
import { Audio } from 'react-loader-spinner';
export default function Register() {

  let [errMeg, setErrMeg] = useState()
  let navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  async function registerSubmit(values) {
    console.log(values);
    // console.log(res.response.data.messega  );
    try {

      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);

      if (res.data.message == 'success') {

        setIsLoading(true)
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        console.log("false");
      }

      console.log('success', res.data);

    } catch (error) {

      setErrMeg(error.response.data.message);
      console.log(error.response.data.message);

    }
  }




  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  let valdateSchema = Yup.object({
    name: Yup.string().min(3, 'name minlength is 3').max(10, 'name maxlength is 10').required('name is required'),
    email: Yup.string().email('email is invalid').required('email is required'),
    phone: Yup.string().matches(phoneRegExp, 'phone is invalid').min(11).max(11).required('phone is required'),
    password: Yup.string().matches(/^[A-Z][a-zA-Z0-9]{6,}$/, 'password is invalid'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], "repassword & password don't match"),
  })
  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    }, validationSchema: valdateSchema,
    onSubmit: registerSubmit
  })


  return <>
    <div className='w-75 mx-auto py-5'>
      {isSuccess ? <div style={{ backgroundColor: '#0aad0a' }} className='alert alert-success text-center'>Congratulations your account has been created</div> : ''}
      <h3>Register Now</h3>
      <form className='shadow p-5 m-auto rounded-4' onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name :</label>

        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" id='name' name='name' />
        {formik.errors.name && formik.touched.name ? <div className='alert p-2 mt-2 alert-danger'>{formik.errors.name}</div> : ""}


        <label htmlFor="email">Email :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email' />
        {formik.errors.email && formik.touched.email ? <div className='alert p-2 mt-2 alert-danger'>{formik.errors.email}</div> : ""}


        <label htmlFor="phone">Phone :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id='phone' name='phone' />
        {formik.errors.phone && formik.touched.phone ? <div className='alert p-2 mt-2 alert-danger'>{formik.errors.phone}</div> : ""}


        <label htmlFor="password">Password :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" id='password' name='password' />
        {formik.errors.password && formik.touched.password ? <div className='alert p-2 mt-2 alert-danger'>{formik.errors.password}</div> : ""}


        <label htmlFor="rePassword">rePassword :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" id='rePassword' name='rePassword' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert p-2 mt-2 alert-danger'>{formik.errors.rePassword}</div> : ""}
        {errMeg ? <div className='alert p-2 mt-2 alert-danger'>{errMeg}</div> : ''}
        {isLoading ? <button className='btn bg-main text-white mt-2' type='button'>
          <Audio
            height="20"
            width="80"
            color="white"
            ariaLabel="audio-loading"
            wrapperStyle
            wrapperClass
            radius='9'
          /></button> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-2'>Register</button>
        }
      </form>
    </div>
  </>
}