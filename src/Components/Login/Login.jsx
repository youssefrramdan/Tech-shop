import React, { useContext, useState } from 'react'
import Style from "./Login.module.css"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';
export default function Login() {
  let { setUserToken, getUserData } = useContext(UserContext)
  let [errMeg, setErrMeg] = useState()
  let navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  async function loginSubmit(values) {
    console.log(values);
    setUserToken(null)
    // console.log(res.response.data.messega  );
    try {

      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);

      if (res.data.message == 'success') {
        localStorage.setItem('userToken', res.data.token)
        setUserToken(res.data.token)
        getUserData();
        setIsLoading(true)
        setIsSuccess(true);

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        console.log("false");
      }

      console.log('success', res.data);

    } catch (error) {
      isLoading(false)
      setErrMeg(error.response.data.message);
      console.log(error.response.data.message);

    }
  }




  let valdateSchema = Yup.object({
    email: Yup.string().email('email is invalid').required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-zA-Z0-9]{6,}$/, 'Wrong password'),
  })
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, validationSchema: valdateSchema,
    onSubmit: loginSubmit
  })


  return <>
    <div className='w-75 mx-auto py-5'>
      {isSuccess ? <div style={{ backgroundColor: "#0aad0a" }} className='alert alert-success text-center'>Login Success</div> : ''}
      <h3>Login Now</h3>
      <form className='shadow p-5 m-auto rounded-4' onSubmit={formik.handleSubmit}>



        <label htmlFor="email">Email :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email' />
        {formik.errors.email && formik.touched.email ? <div className='alert p-2 mt-2 alert-danger'>{formik.errors.email}</div> : ""}




        <label htmlFor="password">Password :</label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" id='password' name='password' />
        {formik.errors.password && formik.touched.password ? <div className='alert p-2 mt-2 alert-danger'>{formik.errors.password}</div> : ""}



        {isLoading ? <button className='btn bg-main text-center text-white mt-2' type='button'><Audio
          height="20"
          width="80"
          color="white"
          ariaLabel="audio-loading"
          wrapperStyle
          wrapperClass
          radius='9'
        /></button> : <>
          <div className='d-flex align-items-center'>
            <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-2 mx-2 '>Login</button>
            {/* <p className='mt-3'>If you don't have account </p> */} <Link className='btn text-decoration-underline ' to={'/register'}><span className='text-decoration-none'>If you don't have account</span> Register Now</Link>

          </div>


        </>}
      </form>
    </div>
  </>
}