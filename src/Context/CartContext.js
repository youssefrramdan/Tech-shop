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

    // وظيفة لإضافة منتج إلى السلة
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

    // وظيفة لجلب بيانات السلة
    async function getUserCart() {
        try {
            const { data } = await axios.get('https://gcm.onrender.com/api/carts', { headers });
            const cart = data.cart;

            const formattedCartItems = cart.cartItems.map((item) => ({
                id: item.id, // معرف العنصر في السلة
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

            console.log('Formatted Cart Items:', formattedCartItems);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    // وظيفة لتحديث كمية منتج داخل السلة باستخدام productId
    async function updateProductQuantity(productId, newQuantity) {
        try {
            console.log('Sending to API:', { productId, newQuantity }); // لتتبع القيم المرسلة
            const { data } = await axios.put(
                `https://gcm.onrender.com/api/carts/${productId}`,
                { quantity: newQuantity },
                { headers }
            );
            if (data.message === 'Product quantity updated successfully') {
                await getUserCart(); // تحديث بيانات السلة بعد التعديل
                return true;
            } else {
                console.error('Unexpected API response:', data);
                return false;
            }
        } catch (error) {
            console.error('Error occurred while updating product quantity:', error.response?.data || error.message);
            return false;
        }
    }

    // وظيفة لحذف منتج من السلة باستخدام cartItemId
    async function deleteProductFromCart(cartItemId) {
        try {
            const { data } = await axios.delete(`https://gcm.onrender.com/api/carts/${cartItemId}`, { headers });
            if (data.message === 'Item removed successfully') {
                await getUserCart(); // تحديث بيانات السلة بعد الحذف
                return true;
            }
            return false;  // إذا كانت الرسالة غير متوقعة
        } catch (error) {
            console.error('Error deleting product from cart:', error);
            return false;
        }
    }

    // وظيفة لإفراغ السلة بالكامل
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

    useEffect(() => {
        if (userToken) {
            getUserCart(); // جلب بيانات السلة عند تحميل السياق
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
            }}
        >
            {children}
        </cartContext.Provider>
    );
}
