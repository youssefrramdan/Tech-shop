import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'

export const cartContext = createContext()

export default function CartContextProvider({ children }) {

    const { userToken } = useContext(UserContext);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [allProducts, setAllProducts] = useState([]);
    const [cartID, setCartID] = useState([]);

    async function addProductTOCart(productId) {

        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { 'productId': productId }, { headers: { token: localStorage.getItem('userToken') } })
            getUserCart();
            return data;
        }
        catch (e) {
            console.log(e);
        }

    }

    function getUserCart() {
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: { token: localStorage.getItem('userToken') }
        }).then((res) => {
            setAllProducts(res.data.data.products);
            setNumOfCartItems(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
            setCartID(res.data.data._id);
            localStorage.setItem('userID', res.data.data.cartOwner)

            console.log('res', res.data);
        }).catch((e) => {
            // window.location.reload()
            // console.log('error ', e);
        })
    }
    async function updateCount(id, newCount) {
        const booleanFlag = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            'count': newCount
        }, {
            headers: {
                token: localStorage.getItem('userToken')
            }
        }).then((res) => {
            setAllProducts(res.data.data.products);
            setNumOfCartItems(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
            return true;

        }).catch((err) => {
            console.log('err', err);
            return false;
        })
        return booleanFlag;
    }

    async function clearCart() {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: { token: localStorage.getItem('userToken') }
        }).then((res) => {
            setAllProducts([]);
            setNumOfCartItems(0);
            setTotalCartPrice(0);
            console.log(res.data);

            return true;

        }).catch((err) => {
            console.log('err', err);
            return false;
        })
        return res;
    }
    async function deleteproduct(id) {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: { token: localStorage.getItem('userToken') }
        }).then((res) => {
            setAllProducts(res.data.data.products);
            setNumOfCartItems(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
            return true;

        }).catch((err) => {
            console.log('err', err);
            return false;
        })
        return res;
    }
    useEffect(() => {
        console.log('getting');
        getUserCart();
    }, [userToken]);

    return <cartContext.Provider value={{ addProductTOCart, numOfCartItems, totalCartPrice, allProducts, updateCount, deleteproduct, clearCart, getUserCart, cartID }}>
        {children}
    </cartContext.Provider>
}