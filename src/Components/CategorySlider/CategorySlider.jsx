import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Audio } from 'react-loader-spinner';

export default function CategorySlider() {

  // Function to fetch categories
  function getCategories() {
    return axios.get('https://gcm.onrender.com/api/categories');
  }

  // Using React Query to fetch data
  const { data, isLoading } = useQuery('categorySlider', getCategories);

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div className='d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center'>
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
    );
  }

  // Slider settings
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {data?.data?.categories.map((category, idx) => (
        <div key={idx} className="text-center">
          <img
            style={{ height: '150px' }}
            className="w-100 rounded-5"
            src={category.imageCover}
            alt={category.name}
          />
          <h4 className="mt-2">{category.name}</h4>
        </div>
      ))}
    </Slider>
  );
}
