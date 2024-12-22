import React, { useContext } from 'react'
import Style from "./Payment.module.css"
import axios from 'axios'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const { cartID, getUserCart, numOfCartItems } = useContext(cartContext);
  const nav = useNavigate();

  function comfirmOnlinePayment() {
    const details = document.getElementById('details').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;

    const shippingObject = {
      "shippingAddress": {
        details,
        phone,
        city
      }
    }
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`, shippingObject, {
      headers: { token: localStorage.getItem('userToken') }, params: { url: 'http://localhost:3000' }
    }).then((res) => {
      if (res.data.status === 'success') {
        window.open(res.data.session.url, '_self')
      }
    }).catch((e) => {
      toast.error('Erorr', { duration: 1500, position: 'top-center' })

      console.log('error', e);
    })

  }
  function comfirmCashPayment() {
    const details = document.getElementById('details').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;

    const shippingObject = {
      "shippingAddress": {
        details,
        phone,
        city
      }
    }
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`, shippingObject, {
      headers: { token: localStorage.getItem('userToken') }
    }).then((res) => {
      if (res.data.status === 'success') {
        toast.success('payment completed successfully', { duration: 1500, position: 'top-center' })
        setTimeout(() => {
          nav('/products')
          window.location.reload()
        }, 1500);
      }
    }).catch((e) => {
      toast.error('Erorr', { duration: 1500, position: 'top-center' })

      console.log('error', e);
    })

  }
  return <>

    <div className=' w-50 m-auto mt-5'>

      <label htmlFor="city">city</label>
      <input type="text" id='city' placeholder='city...' className=' form-control mb-2' />


      <label htmlFor="phone">phone</label>
      <input type="text" id='phone' placeholder='phone...' className=' form-control mb-2' />



      <label htmlFor="details">details</label>
      <textarea type="text" id='details' placeholder='details...' className=' form-control mb-2' />
      <div className='text-center'>
        <button onClick={comfirmCashPayment} className='btn btn-success w-25'>Comfirm Cash Payment</button>
        <button onClick={comfirmOnlinePayment} className='btn btn-success ms-2 w-25'>Comfirm Online Payment</button>

      </div>
    </div>


  </>
}
