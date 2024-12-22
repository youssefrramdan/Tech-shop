import React, { useEffect, useState } from 'react'
import Style from "./AllOrders.module.css"
import axios from 'axios'
import { useQuery } from 'react-query'
import { Audio } from 'react-loader-spinner'
import emptyimg from '../../Assets/images/preview.png'

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState([])
  console.log(allOrders);
  async function getUserOrder() {
    const userID = localStorage.getItem('userID')

    await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
      .then((res) => {
        setAllOrders(res.data);
        console.log(userID);
      }).catch((e) => {
        console.log('error', e);
      })

    console.log('userID', userID);
  }
  useEffect(() => {
    getUserOrder();
  }, [])
  const { isLoading } = useQuery('getUserOrder', getUserOrder)
  if (isLoading) {
    return <div className='d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center '>
      <Audio
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  }
  if (allOrders == 0) {
    return <div>

      <div className='d-flex justify-content-center'>
        <div className='text-center my-4'>
          <h1>No Orders Yet</h1>
          <img src={emptyimg} height={400} alt="" />

        </div>

      </div>
    </div>
  }
  return (
    <>
      <div className="container">
        <div className="row">
          {allOrders.map((order, idx) => (
            <div key={idx} className="col-md-6 mt-5 text-center g-1 shadow p-5 m-auto rounded-4">
              <div className=" g-2">
                {/* Use flexbox to align cart items horizontally */}
                <div className="d-flex flex-wrap">
                  {order.cartItems.map((item, secIdx) => (
                    <div key={secIdx} className="col-md-5 ms-2">
                      <div className='motag  h-100 '>
                        <img src={item.product.imageCover} className='w-100 rounded-4' alt={item.product.title} />
                        <h6 className='text-main '>{item.product.title}</h6>
                        <h6>Price: {item.price}</h6>
                        <h6>Count: {item.count}</h6>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Render order details */}
                <h5>Payment: {order.paymentMethodType}</h5>
                <h5>Order Price: {order.totalOrderPrice}</h5>
                <p>
                  This order is delivering to {order.shippingAddress.city} on phone number: {order.shippingAddress.phone} with details: {order.shippingAddress.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
