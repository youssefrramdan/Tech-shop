import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Audio } from 'react-loader-spinner';

export default function CategorySlider() {

  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const { data, isLoading } = useQuery('categorySlider', getCategories);

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
          slidesToShow: 1,
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
          slidesToShow: 3,  // Show three photos on small screens
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {data.data.data.map((category, idx) =>
        <div className="row" key={idx}>
          <div className="col-md-12 gx-2 text-center py-3 px-0">
            <img
              style={{ height: '200px' }}
              className="w-100 rounded-5 p-3 mx-3 my-3"
              src={category.image}
              alt={category.name}
            />
            <h4 className="text-center me-1 mt-2">{category.name}</h4>
          </div>
        </div>
      )}
    </Slider>
  );
}
