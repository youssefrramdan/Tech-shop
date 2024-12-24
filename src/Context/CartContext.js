import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

export const cartContext = createContext();

export default function CartContext({ children }) {
    const { userToken } = useContext(UserContext);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [allProducts, setAllProducts] = useState([]);
    const [cartID, setCartID] = useState([]);

    // هيدر يحتوي على التوكن مباشرة
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
            await getUserCart();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getUserCart() {
        try {
            const { data } = await axios.get('https://gcm.onrender.com/api/carts', {
                headers,
            });
            const cart = data.cart;
            setAllProducts(cart.cartItems);
            setNumOfCartItems(cart.cartItems.length);
            setTotalCartPrice(cart.totalCartPrice);
            setCartID(cart._id);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    async function updateProductQuantity(productId, newQuantity) {
        try {
            const { data } = await axios.put(
                `https://your-api-endpoint/cart/update/${productId}`,
                { quantity: newQuantity },
                { headers }
            );
            await getUserCart();
            return true;
        } catch (error) {
            console.error('Error updating product quantity:', error);
            return false;
        }
    }

    async function clearCart() {
        try {
            const { data } = await axios.delete('https://gcm.onrender.com/api/carts', {
                headers,
            });
            setAllProducts([]);
            setNumOfCartItems(0);
            setTotalCartPrice(0);
            return true;
        } catch (error) {
            console.error('Error clearing cart:', error);
            return false;
        }
    }

    async function deleteProductFromCart(itemId) {
        try {
            const { data } = await axios.delete(
                `https://gcm.onrender.com/api/carts/${itemId}`,
                { headers }
            );
            await getUserCart();
            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            return false;
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
            }}
        >
            {children}
        </cartContext.Provider>
    );
}
