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

    // إعداد الهيدر للتعامل مع التوكن
    const headers = {
        Authorization: userToken, // التوكن يتم إضافته مباشرة
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
                await getUserCart(); // تحديث بيانات السلة بعد الإضافة
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
            setAllProducts(cart.cartItems);
            setNumOfCartItems(cart.cartItems.length);
            setTotalCartPrice(cart.totalCartPrice);
            setCartID(cart._id);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    // وظيفة لتحديث كمية منتج داخل السلة
    async function updateProductQuantity(productId, newQuantity) {
        try {
            const { data } = await axios.put(
                `https://gcm.onrender.com/api/carts/${productId}`,
                { quantity: newQuantity },
                { headers }
            );
            if (data.message === 'success') {
                await getUserCart(); // تحديث بيانات السلة بعد التعديل
                return true;
            }
        } catch (error) {
            console.error('Error updating product quantity:', error);
            return false;
        }
    }

    // وظيفة لحذف منتج من السلة
    async function deleteProductFromCart(itemId) {
        try {
            const { data } = await axios.delete(`https://gcm.onrender.com/api/carts/${itemId}`, { headers });
            if (data.message === 'success') {
                await getUserCart(); // تحديث بيانات السلة بعد الحذف
                return true;
            }
        } catch (error) {
            console.error('Error deleting product from cart:', error);
            return false;
        }
    }

    // وظيفة لإفراغ السلة بالكامل
    async function clearCart() {
        try {
            const { data } = await axios.delete('https://gcm.onrender.com/api/carts', { headers });
            if (data.message === 'success') {
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
