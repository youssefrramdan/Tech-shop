import React from 'react'
import Style from "./Footer.module.css"
import payPal from '../../Assets/images/paypal.png'
import amazonPay from '../../Assets/images/AmazonPay.webp'
import americanExpress from '../../Assets/images/American-Express.png'
import masterCard from '../../Assets/images/MasterCard.png'
import ios from '../../Assets/images/Available_on_the_App_Store_(black)_SVG.svg.png'
import play from '../../Assets/images/get-it-on-google-play-badge.webp'

export default function Footer() {
  return <>
    <div className='footer pb-5 mt-5'>
      <div className="container ">
        <div className="row">
          <div className="col-md-6">
            <h2 className='mt-5'>Get The FreshCart app</h2>
            <p>We wil send you a link , open it on your phone to download the app</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 ">
            <input type="text" className='form-control ' placeholder='Email' />
          </div>
          <div className="col-md-2">
            <button className='btn bg-main text-white w-100'>Share App Link</button>
          </div>
        </div>
        <hr />
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-2">
            <h5>Payment Partners</h5>
          </div>
          <div className="col-md-1 ">
            <img src={amazonPay} alt="amazonPay" className='paypal h-75 mb-2' />
          </div>
          <div className="col-md-1 ">
            <img src={americanExpress} alt="americanExpress" className='paypal mb-2 h-75 ' />
          </div>
          <div className="col-md-1 ">
            <img src={masterCard} alt="masterCard" className='paypal mb-2  h-75 ' />
          </div>
          <div className="col-md-1 ">
            <img src={payPal} alt="paypal" className='paypal  mb-1' />
          </div>
          <div className="col-md-6">
            <div className='d-flex flex-wrap align-items-center '>
              <h4 className='ms-2 mb-2'>Get deliveries with freshCart</h4>
              <img src={ios} alt="ios" className='ios ms-4 mb-2' />
              <img src={play} alt="play" className='ios ms-4 mb-2' />
            </div>
          </div>
        </div>
        <hr />

      </div>
    </div>

  </>
}
