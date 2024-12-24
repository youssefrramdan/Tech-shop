// src/components/Cart/Cart.js

import React, { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import { Audio } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FaShoppingCart } from 'react-icons/fa'; // استيراد أيقونة من FontAwesome

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
            <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
                <Audio
                    height="100"
                    width="100"
                    color="#007bff"
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
                    <h4 className="text-primary" style={{ fontSize: '2rem', fontWeight: 'bold' }}>Your Cart is Empty</h4>
                    {/* استخدام أيقونة سلة فارغة بدلاً من الصورة */}
                    <FaShoppingCart size={100} className="text-muted" style={{ marginTop: '20px' }} />
                </div>
            </div>
        );
    }

    async function handleUpdateQuantity(productId, newQuantity) {
        const res = await updateProductQuantity(productId, newQuantity);
        if (res) {
            toast.success('Product quantity updated successfully', { duration: 1500, position: 'top-center' });
        } else {
            toast.error('Error occurred while updating product quantity', { duration: 1500, position: 'top-center' });
        }
    }

    async function handleDeleteProduct(cartItemId) {
        const res = await deleteProductFromCart(cartItemId);
        if (res) {
            toast.success('Product removed successfully', { duration: 1500, position: 'top-center' });
        } else {
            toast.error('Error occurred while removing product', { duration: 1500, position: 'top-center' });
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Your Shopping Cart</h2>
            <div className="row">
                {/* قائمة المنتجات في السلة */}
                <div className="col-md-8">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th className="text-center">Product</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Subtotal</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allProducts.map((cartItem) => (
                                    <tr key={cartItem.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={cartItem.product.image}
                                                    className="img-fluid rounded-start"
                                                    alt={cartItem.product.name}
                                                    style={{ maxHeight: '100px', objectFit: 'contain' }}
                                                />
                                                <span className="ms-3">{cartItem.product.name}</span>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <button
                                                    className="btn btn-outline-success btn-sm mx-2"
                                                    onClick={() => handleUpdateQuantity(cartItem.product.id, cartItem.quantity + 1)}
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                                <span>{cartItem.quantity}</span>
                                                <button
                                                    className="btn btn-outline-danger btn-sm mx-2"
                                                    onClick={() => handleUpdateQuantity(cartItem.product.id, cartItem.quantity - 1)}
                                                    disabled={cartItem.quantity === 1}
                                                >
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <strong>{cartItem.price * cartItem.quantity} EGP</strong>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteProduct(cartItem.id)}
                                            >
                                                <i className="fas fa-trash-alt"></i> Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* قسم الملخص */}
                <div className="col-md-4">
                    <div className="card p-4 shadow-lg rounded-lg">
                        <h4 className="card-title text-primary">Order Summary</h4>
                        <hr />
                        <p className="card-text">
                            <strong>Subtotal:</strong> {totalCartPrice} EGP
                        </p>
                        <p className="card-text">
                            <strong>Tax:</strong> 35 EGP
                        </p>
                        <p className="card-text">
                            <strong>Total:</strong> {totalCartPrice + 35} EGP
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
