// src/components/Cart/Cart.js

import React, { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import { Audio } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import emptyimg from '../../Assets/images/empty-cart.png';

export default function Cart() {
    const {
        updateProductQuantity,
        totalCartPrice,
        allProducts,
        deleteProductFromCart,
        clearCart,
        getUserCart,
        numOfCartItems,
    } = useContext(cartContext);

    const { isError, isLoading } = useQuery('getUserCart', getUserCart);

    if (isLoading) {
        return (
            <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
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

    if (isError || numOfCartItems === 0) {
        return (
            <div className="d-flex justify-content-center">
                <div className="text-center my-4">
                    <h4>Your Cart is Empty</h4>
                    <img src={emptyimg} height={300} alt="Empty Cart" />
                    <Link to="/products" className="btn btn-primary mt-3">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    // دالة لتحديث كمية المنتج
    async function handleUpdateQuantity(productId, newQuantity) {
        console.log('Updating quantity:', { productId, newQuantity }); // لتتبع القيم
        const res = await updateProductQuantity(productId, newQuantity);
        if (res) {
            toast.success('Product quantity updated successfully', { duration: 1500, position: 'top-center' });
        } else {
            toast.error('Error occurred while updating product quantity', { duration: 1500, position: 'top-center' });
        }
    }

     async function handleDeleteProduct(productId) {
        console.log('Deleting product:', { productId }); // لتتبع القيم
        const res = await deleteProductFromCart(productId);
        if (res) {
            toast.success('Product removed successfully', { duration: 1500, position: 'top-center' });
        } else {
            toast.error('Error occurred while removing product', { duration: 1500, position: 'top-center' });
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Your Shopping Cart</h2>
            <div className="row">
                {/* قائمة المنتجات في السلة */}
                <div className="col-md-8">
                    {allProducts.map((cartItem) => (
                        <div key={cartItem.id} className="card mb-3 shadow-sm">
                            <div className="row g-0 align-items-center">
                                {/* صورة المنتج */}
                                <div className="col-md-3">
                                    <img
                                        src={cartItem.product.image || emptyimg}
                                        className="img-fluid rounded-start"
                                        alt={cartItem.product.name}
                                    />
                                </div>
                                {/* تفاصيل المنتج */}
                                <div className="col-md-6">
                                    <div className="card-body">
                                        <h5 className="card-title">{cartItem.product.name}</h5>
                                        <p className="card-text text-muted">Price: {cartItem.price} EGP</p>
                                        <p className="card-text text-muted">Quantity: {cartItem.quantity}</p>
                                    </div>
                                </div>
                                {/* التحكم في الكمية وحذف المنتج */}
                                <div className="col-md-3 text-center">
                                    <div className="d-flex justify-content-around align-items-center">
                                        <button
                                            className="btn btn-outline-success"
                                            onClick={() => handleUpdateQuantity(cartItem.product.id, cartItem.quantity + 1)}
                                        >
                                            +
                                        </button>
                                        <p className="m-0">{cartItem.quantity}</p>
                                        <button
                                            className="btn btn-outline-danger"
                                            disabled={cartItem.quantity === 1}
                                            onClick={() => handleUpdateQuantity(cartItem.product.id, cartItem.quantity - 1)}
                                        >
                                            -
                                        </button>
                                    </div>
                                    <button
                                        className="btn btn-danger mt-2"
                                        onClick={() => handleDeleteProduct(cartItem.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* قسم الملخص */}
                <div className="col-md-4">
                    <div className="card p-3 shadow-lg">
                        <h4 className="card-title">Order Summary</h4>
                        <hr />
                        <p className="card-text">
                            <strong>Total Items:</strong> {numOfCartItems}
                        </p>
                        <p className="card-text">
                            <strong>Total Price:</strong> {totalCartPrice} EGP
                        </p>
                        <button className="btn btn-danger w-100 mb-2" onClick={clearCart}>
                            Clear Cart
                        </button>
                        <Link to="/checkout" className="btn btn-primary w-100">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
