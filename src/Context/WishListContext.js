import React, { Children, createContext, useContext } from 'react'
import { UserContext } from './UserContext';
import axios from 'axios';
export const WishListContext = createContext()


export default function WishListContextProvider({ children }) {


    //const { userToken } = useContext(UserContext);
    async function addToWishList(productId) {
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { 'productId': productId }, { headers: { token: localStorage.getItem('userToken') } })
            return data;
        } catch (error) {
            console.log('error', error);
        }
    }


    async function deleteproduct(id) {
         return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: { token: localStorage.getItem('userToken') }
        })
    }


    return <WishListContext.Provider value={{ addToWishList, deleteproduct }}>


        {children}

    </WishListContext.Provider>


}
