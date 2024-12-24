import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import { Audio } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import CategorySlider from "../CategorySlider/CategorySlider";

export default function Home() {
    const { addProductToCart } = useContext(cartContext);
    const { addToWishList } = useContext(WishListContext);

    async function productToWishList(id) {
        try {
            const res = await addToWishList(id);
            if (res?.status === "success") {
                toast.success("Added to Wishlist", { duration: 1000, position: "top-center" });
            } else {
                toast.error("Error adding to Wishlist", { duration: 1500, position: "top-center" });
            }
        } catch (error) {
            toast.error("Unexpected error occurred", { duration: 1500, position: "top-center" });
        }
    }

    // إضافة منتج إلى السلة
    async function addProduct(productId) {
        try {
            const res = await addProductToCart(productId);
            if (res?.status === "success") {
                toast.success("Added to Cart", { duration: 1500, position: "top-center" });
            } else {
                toast.error("Error adding to Cart", { duration: 1500, position: "top-center" });
            }
        } catch (error) {
            toast.error("Unexpected error occurred", { duration: 1500, position: "top-center" });
        }
    }

    // جلب المنتجات
    async function getAllProducts() {
        const response = await fetch("https://gcm.onrender.com/api/products");
        return response.json();
    }

    const { isLoading, data, error } = useQuery("getAllProducts", getAllProducts);

    if (isLoading) {
        return (
            <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex vh-100 bg-danger bg-opacity-50 justify-content-center align-items-center">
                <h3 className="text-white">Failed to load products. Please try again later.</h3>
            </div>
        );
    }

    const products = data.products.slice(0, 8);

    return (
        <>
            {/* Hero Section */}
            <section className="hero-section d-flex justify-content-center align-items-center text-center bg-primary text-white py-5">
                <div className="hero-content">
                    <h1 className="fw-bold">Welcome to TechSphere</h1>
                    <p>Your one-stop shop for all electronics and gadgets.</p>
                    <Link to="/products" className="btn btn-light btn-lg shadow-lg mt-3">
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Category Slider */}
            <div className="container my-5">
                <CategorySlider />
            </div>

            {/* Featured Products Section */}
            <div className="container my-5">
                <h2 className="text-center text-primary mb-4 fw-bold">Featured Products</h2>
                <div className="row gy-4">
                    {products.map((product) => (
                        <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card border-0 shadow-lg h-100">
                                <img
                                    src={product.imageCover}
                                    className="card-img-top"
                                    alt={product.name}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title text-truncate">{product.name}</h5>
                                    <p className="card-text">
                                        {product.priceAfterDiscount ? (
                                            <>
                                                <span className="text-muted text-decoration-line-through me-2">
                                                    {product.price} EGP
                                                </span>
                                                <span className="text-success fw-bold">
                                                    {product.priceAfterDiscount} EGP
                                                </span>
                                            </>
                                        ) : (
                                            <span className="fw-bold">{product.price} EGP</span>
                                        )}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-primary btn-sm d-flex align-items-center gap-2"
                                            onClick={() => addProduct(product._id)}
                                        >
                                            <FaShoppingCart /> Add to Cart
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
                                            onClick={() => productToWishList(product._id)}
                                        >
                                            <FaHeart /> Wishlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
