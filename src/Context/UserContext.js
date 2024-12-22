import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { LoaderIcon } from "react-hot-toast";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);
    function getUserData() {
        const userData = jwtDecode(localStorage.getItem('userToken'));
        console.log('userdata', userData);
        setUserData(userData);
    }
    useEffect(function () {
        const val = localStorage.getItem('userToken')
        if (val !== null) {
            setUserToken(val)
            setUserData(jwtDecode(val));
        }
    }, [])
    return <UserContext.Provider value={{ userToken, setUserToken, userData, setUserData, getUserData }}>
        {children}
    </UserContext.Provider>
}