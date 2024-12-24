import axios from 'axios';
import { Audio } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import SimpleSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext.js";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

export default function Home() {
    const { addProductToCart } = useContext(cartContext);
    const { addToWishList } = useContext(WishListContext);

    // Function to add a product to the Wishlist
    async function productToWishList(id) {
        try {
            const res = await addToWishList(id);
            if (res?.status === 'success') {
                toast.success('Added successfully to Wish List', { duration: 1000, position: 'top-center' });
            } else {
                toast.error('Error occurred', { duration: 1500, position: 'top-center' });
            }
        } catch (error) {
            console.error("Error adding to Wishlist:", error);
            toast.error('An unexpected error occurred', { duration: 1500, position: 'top-center' });
        }
    }

    // Function to add a product to the Cart
    async function addProduct(id) {
        try {
            const res = await addProductToCart(id);
            if (res?.status === 'success') {
                toast.success('Added successfully to Cart', { duration: 1500, position: 'top-center' });
            } else {
                toast.error(`Error occurred: ${res?.message || "Unknown error"}`, { duration: 1500, position: 'top-center' });
            }
        } catch (error) {
            console.error("Error adding to Cart:", error);
            toast.error('An unexpected error occurred', { duration: 1500, position: 'top-center' });
        }
    }

    // Function to fetch all products
    async function getAllProducts() {
        try {
            const response = await axios.get("https://gcm.onrender.com/api/products");
            console.log("Fetched Products:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error('Error fetching products', { duration: 1500, position: 'top-center' });
            throw new Error("Failed to fetch products");
        }
    }

    // Fetch products using React Query
    const { isLoading, data, error } = useQuery('getAllProducts', getAllProducts);

    // Show loading spinner if data is being fetched
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

    // Show error message if fetching data failed
    if (error) {
        return (
            <div className='d-flex vh-100 bg-danger bg-opacity-50 justify-content-center align-items-center'>
                <h3 className="text-white">Failed to load products. Please try again later.</h3>
            </div>
        );
    }

    return (
        <>
            <div className="container">
                <div className="row my-4">
                    <div className="col-md-9 px-0">
                        <SimpleSlider />
                    </div>
                    <div className="col-md-3 px-0 ps-0">
                        <div>
                            <img
                                style={{ height: '150px' }}
                                className='w-100'
                                src={require('../../Assets/images/blog-img-1.jpeg')}
                                alt="Promotion 1"
                            />
                        </div>
                        <div>
                            <img
                                style={{ height: '150px' }}
                                className='w-100'
                                src={require('../../Assets/images/blog-img-2.jpeg')}
                                alt="Promotion 2"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <CategorySlider />
            </div>

            {/* Product list section */}
            <div className="container products mt-4">
                <div className="row gy-3 mt-5">
                    {data.products.map((product) => (
                        <div key={product._id} className="col-6 col-sm-4 col-md-3 col-lg-2 gx-5 gy-5 overflow-hidden position-relative">
                            <Link className='product h-100 text-center' to={`/productdetails/${product._id}`}>
                                <div>
                                    <img src={product.imageCover} className='w-75' alt={product.name} />
                                    <h6 className='text-main'>{product.category?.name}</h6>
                                    <h2 className='h4 text-center'>{product.name.split(' ').slice(0, 2).join(' ')}</h2>
                                    <div className='d-flex justify-content-between'>
                                        {product.priceAfterDiscount ? (
                                            <p>
                                                <span className='text-decoration-line-through'>{product.price}</span> - {product.priceAfterDiscount}
                                            </p>
                                        ) : (
                                            <p>{product.price}</p>
                                        )}
                                        <p>Sold: {product.sold}</p>
                                    </div>
                                </div>
                            </Link>
                            
                            {/* Add to wishlist button */}
                            <button
                                onClick={() => productToWishList(product._id)}
                                className="btn-heart fa-1xl border-0 bg-white position-absolute top-0 start-0"
                            >
                                <i id="heart" className="fa-regular fa-heart heart"></i>
                            </button>
                            
                            {/* Add to cart button */}
                            <button
                                onClick={() => addProduct(product._id)}
                                className='addCart btn bg-main text-white w-100 mb-3'
                            >
                                Add to Cart +
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
