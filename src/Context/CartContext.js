// src/Context/CartContext.js

import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

export const cartContext = createContext();

export default function CartContext({ children }) {
    const { userToken } = useContext(UserContext);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [allProducts, setAllProducts] = useState([]);
    const [cartID, setCartID] = useState(null);

    const headers = {
        Authorization: userToken,
    };

    async function addProductToCart(productId, quantity = 1) {
        try {
            const { data } = await axios.post(
                'https://gcm.onrender.com/api/carts',
                { product: productId, quantity },
                { headers }
            );
            if (data.message === 'success') {
                await getUserCart();
                return { status: 'success', cart: data.cart };
            } else {
                return { status: 'error', message: data.message || 'Failed to add product' };
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            return { status: 'error', message: error.response?.data?.message || error.message };
        }
    }

    async function getUserCart() {
        try {
            const { data } = await axios.get('https://gcm.onrender.com/api/carts', { headers });
            const cart = data.cart;

            const formattedCartItems = cart.cartItems.map((item) => ({
                id: item.id,
                product: {
                    id: item.product.id,
                    name: item.product.name,
                    image: item.product.image,
                },
                quantity: item.quantity,
                price: item.price,
            }));

            setAllProducts(formattedCartItems);
            setNumOfCartItems(formattedCartItems.length);
            setTotalCartPrice(cart.totalCartPrice);
            setCartID(cart._id);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    async function updateProductQuantity(productId, newQuantity) {
        try {
            const { data } = await axios.put(
                `https://gcm.onrender.com/api/carts/${productId}`,
                { quantity: newQuantity },
                { headers }
            );
            if (data.message === 'Product quantity updated successfully') {
                await getUserCart();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error occurred while updating product quantity:', error.response?.data || error.message);
            return false;
        }
    }

    async function deleteProductFromCart(cartItemId) {
        try {
            const { data } = await axios.delete(`https://gcm.onrender.com/api/carts/${cartItemId}`, { headers });
            if (data.message === 'Item removed successfully') {
                await getUserCart();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting product from cart:', error);
            return false;
        }
    }

    async function clearCart() {
        try {
            const { data } = await axios.delete('https://gcm.onrender.com/api/carts', { headers });
            if (data.message === 'cart removed successfully') {
                setAllProducts([]);
                setNumOfCartItems(0);
                setTotalCartPrice(0);
                return true;
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
            return false;
        }
    }

    async function placeOrder(shippingAddress) {
        if (!cartID) {
            console.error('No cart ID available to place an order.');
            return { status: 'error', message: 'Cart ID is missing.' };
        }

        try {
            const response = await axios.post(
                `https://gcm.onrender.com/api/orders/${cartID}`,
                { shippingAddress },
                { headers }
            );
            if (response.data.message === 'Order created successfully') {
                await clearCart();
                return { status: 'success', order: response.data.order };
            } else {
                return { status: 'error', message: response.data.message || 'Order failed.' };
            }
        } catch (error) {
            console.error('Error placing order:', error);
            return { status: 'error', message: error.response?.data?.message || 'Unexpected error occurred.' };
        }
    }

    useEffect(() => {
        if (userToken) {
            getUserCart();
        }
    }, [userToken]);

    return (
        <cartContext.Provider
            value={{
                addProductToCart,
                numOfCartItems,
                totalCartPrice,
                allProducts,
                updateProductQuantity,
                deleteProductFromCart,
                clearCart,
                getUserCart,
                cartID,
                placeOrder,
            }}
        >
            {children}
        </cartContext.Provider>
    );
}
