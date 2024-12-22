import axios from 'axios';
import React from 'react';
import { Audio } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Category() {
  // Function to fetch categories
  async function getCategory() {
    return axios.get('https://gcm.onrender.com/api/categories');
  }

  const { isLoading, data } = useQuery('getCategory', getCategory);

  // Show loader while fetching data
  if (isLoading) {
    return (
      <div className='d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center'>
        <Audio
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="audio-loading"
          visible={true}
        />
      </div>
    );
  }

  // Check if data exists
  const categories = data?.data?.categories || [];

  return (
    <>
      <div className='container mt-4'>
        <div className='row gy-4'>
          {categories.map((category, idx) => (
            <div key={category._id} className='col-6 col-sm-4 col-md-3 col-lg-2 text-center'>
              {/* Display category image */}
              {category.imageCover ? (
                <img
                  src={category.imageCover}
                  alt={category.name}
                  className='w-100 rounded'
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  className='w-100 rounded bg-secondary d-flex align-items-center justify-content-center'
                  style={{ height: '200px' }}
                >
                  No Image
                </div>
              )}
              {/* Display category name */}
              <h5 className='mt-3 text-truncate'>{category.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
