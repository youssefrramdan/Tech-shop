import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { USER_ENDPOINTS } from "../utils/apiConfig";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  async function getUserData() {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const { data } = await axios.get(USER_ENDPOINTS.GET_USER_PROFILE, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(data.data);
        setUserToken(token);
      } catch (e) {
        setUserData(null);
        setUserToken(null);
      }
    } else {
      setUserData(null);
      setUserToken(null);
    }
  }

  function logoutUser() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserData(null);
  }

  useEffect(function () {
    const val = localStorage.getItem("userToken");
    if (val) {
      setUserToken(val);
      getUserData();
    } else {
      setUserToken(null);
      setUserData(null);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userToken,
        setUserToken,
        userData,
        setUserData,
        getUserData,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
