import React from 'react'
import Style from "./Notfound.module.css"
import error from '../../Assets/images/error.svg'
export default function Notfound() {
  return <>
  <div className='d-flex justify-content-center'>
            <div className='text-center my-4'>
            
                <img src={error} height={400} alt="" />
                <h4 className='text-main'>Not Found</h4>

            </div>

        </div>
    </>
}
