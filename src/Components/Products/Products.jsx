import { useState, useContext } from "react";
import axios from 'axios';
import { Audio } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function Products() {
  const { addProductTOCart } = useContext(cartContext);
  const { addToWishList } = useContext(WishListContext);
  const [searchQuery, setSearchQuery] = useState('');

  async function productToWishList(id) {
    const res = await addToWishList(id);
    if (res.status === 'success') {
      toast.success('Added successfully to Wish List', { duration: 1000, position: 'top-center' });
    } else {
      toast.error('Error occurred', { duration: 1500, position: 'top-center' });
    }
  }

  async function addProduct(id) {
    const res = await addProductTOCart(id);
    if (res.status === 'success') {
      toast.success('Added successfully', { duration: 1500, position: 'top-center' });
    } else {
      toast.error('Error occurred', { duration: 1500, position: 'top-center' });
    }
  }

  async function getAllProducts() {
<<<<<<< HEAD
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
=======
    return axios.get('https://gcm.onrender.com/api/products');
>>>>>>> e4f8d19 (Initial commit)
  }

  const { isLoading, data } = useQuery('getAllProducts', getAllProducts);

  if (isLoading) {
    return (
      <div className='d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center'>
        <Audio height="100" width="100" color="#4fa94d" ariaLabel="audio-loading" visible={true} />
      </div>
    );
  }

  const filteredProducts = data.data.data.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control shadow border-black"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="container products mt-4">
          <div className="row gy-3 mt-5">
            {filteredProducts.map((product, idx) => (
              <div key={idx} className="col-6 col-sm-4 col-md-3 col-lg-2 gx-5 overflow-hidden position-relative">
                <Link className='product h-100' to={`/productdetails/${product.id}`}>
                  <div>
                    <img src={product.imageCover} className='w-100' alt={product.title} />
                    <h6 className='text-main'>{product.category.name}</h6>
                    <h2 className='h4 text-center'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                    <div className='d-flex justify-content-between'>
                      {product.priceAfterDiscount ? (
                        <p>
                          <span className='text-decoration-line-through'>{product.price}</span> - {product.priceAfterDiscount}
                        </p>
                      ) : (
                        <p>{product.price}</p>
                      )}
                      <p>
                        <span><i style={{ color: '#ffc908' }} className='fa-solid fa-star'></i></span> {product.ratingsAverage}
                      </p>
                    </div>
                  </div>
                </Link>
                <button onClick={() => productToWishList(product.id)} className="btn-heart fa-1xl border-0 bg-white position-absolute top-0 start-0">
                  <i id="heart" className="fa-regular fa-heart heart"></i>
                </button>
                <button onClick={() => addProduct(product.id)} className='addCart btn bg-main text-white w-100 mb-3'>
                  Add to Cart +
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
