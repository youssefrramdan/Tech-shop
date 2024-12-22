import React, { useContext } from 'react'
import Style from "./ProductDetails.module.css"
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Audio } from 'react-loader-spinner';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { addProductTOCart } = useContext(cartContext);
  const { id } = useParams()
  async function addProduct(id) {

    const res = await addProductTOCart(id)
    if (res.status = 'success') {
      //  console.log('');
      toast.success('added successfully', { duration: 1500, position: 'top-center' })
    }
    else {
      toast.error('Error occurred', { duration: 1500, position: 'top-center' })
    }
  }
  const { isLoading, data, isFetching, isError } = useQuery(`ProductDetails-${id}`, getProductDetails)
  if (isLoading) {
    return <div className='d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center'>
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
  if (isError) {
    return <Navigate to='/products' />
  }
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  const ProductDetails = data.data.data
  return <>
    <div className="container ">
      <div className="row align-items-center ms-5">
        <div className="col-6 col-sm-4 col-md-3 col-lg-2 text-center mt-3">
          <figure>
            <img className='w-100' src={ProductDetails.imageCover} alt={ProductDetails.title} />
          </figure>
        </div>
        <div className="col-9 mt-3">
          <article>
            <h1 className='fw-bold'>{ProductDetails.title}</h1>
            <p>{ProductDetails.description}</p>
            <p className='fw-bold'>{ProductDetails.category.name}</p>
            <div className='d-flex justify-content-between'>
              {ProductDetails.priceAfterDiscount ? <p className='fw-bold'><span className='text-decoration-line-through'>{ProductDetails.price}</span> - {ProductDetails.priceAfterDiscount}EGP</p> : <p className='fw-bold'>{ProductDetails.price}EGP</p>}
              <p className='fw-bold'><span><i style={{ color: '#ffc908' }} className='fa-solid fa-star '></i></span> {ProductDetails.ratingsAverage}</p>
            </div>
            <button onClick={() => addProduct(ProductDetails.id)} className='btn bg-main text-white w-100'>Add to Cart + </button>
          </article>
        </div>
      </div>
    </div>
  </>
}