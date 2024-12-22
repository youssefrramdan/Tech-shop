import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Category() {
  //const [categoryList, setCategory] = useState([])
  async function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    
  }
  const {isLoading , data} = useQuery('getCategory' , getCategory ) 
  console.log(data);  
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

  
  return <>
    <div className='container mt-2'>
      <div className="row">
    
      {data.data.data.map((category , idx) => {
        return <>
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 gy-1  rounded-3" key={idx}>
            <img src={category.image} className='w-100' height={300} />
            <h3 className='text-main text-center fw-bold m-2'>{category.name}</h3>
          </div>
        </>
      })}
  </div>
    </div>
    </>
}
