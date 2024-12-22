import React, { useContext, useEffect, useState } from 'react'
import Style from "./WishList.module.css"
import { Audio } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import axios from 'axios';
import { cartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
import emptyimg from '../../Assets/images/preview.png'


export default function WishList() {
  const { addProductTOCart } = useContext(cartContext);
  const { deleteproduct } = useContext(WishListContext);


  async function getWishList() {
    try {
      return await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers: { token: localStorage.getItem('userToken') } })
    } catch (error) {
      console.log('error', error);
    }
  }
  useEffect(()=>{
    getWishList()
  } , [])
  async function addProduct(id) {

    const { data } = await addProductTOCart(id)
    if (data.status = 'success') {
      toast.success('added successfully', { duration: 1500, position: 'top-center' })
    }
    else {
      toast.error('Error occurred', { duration: 1500, position: 'top-center' })
    }
  }

  const { isLoading, data } = useQuery('getWishList', getWishList)
  //console.log('count' , data.data.count);

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
  if (!data?.data.count) {
    return <>
      <div className='d-flex justify-content-center'>
        <div className='text-center my-4'>
          <h4>Whish List is Empty</h4>
          <img src={emptyimg} height={400} alt="" />

        </div>

      </div>
    </>
  }
   console.log('data', data?.data.data);

  async function deleteMyProduct(id) {
    const res = await deleteproduct(id);
    if (res) {
      toast.success('product removed successfully', { duration: 1500, position: 'top-center' })
      window.location.reload()
    } else {
      toast.error('Error occurred', { duration: 1500, position: 'top-center' })
    }

  }

  return <>


    <div className="container products mt-4">
      <div className="row gy-3 mt-5">
        {data?.data.data.map((product, idx) => {
          return <div key={idx} className="col-6 col-sm-4 col-md-3 col-lg-2 gx-5 position-relative overflow-hidden">
            <Link className='product  h-100' to={`/productdetails/${product.id}`} >
              <div>
                <img src={product.imageCover} className='w-100' alt="" />
                <h6 className='text-main'>{product.category.name}</h6>
                <h2 className='h4 text-center'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                <div className='d-flex justify-content-between'>
                  {product.priceAfterDiscount ? <p><span className='text-decoration-line-through'>{product.price}</span> - {product.priceAfterDiscount}EGP</p> : <p>{product.price}EGP</p>}
                  <p><span><i style={{ color: '#ffc908' }} className='fa-solid fa-star '></i></span> {product.ratingsAverage}</p>
                </div>
              </div>
            </Link>
            <button onClick={() => deleteMyProduct(product.id)} className="btn-heart fa-1xl border-0 bg-white position-absolute top-0 start-0"><i class="fa-solid fa-heart"></i></button>
            <button onClick={() => addProduct(product.id)} className='addCart btn bg-main text-white w-100 mb-3'>Add to Cart + </button>
          </div>
        })}
      </div>
    </div>


  </>
}
