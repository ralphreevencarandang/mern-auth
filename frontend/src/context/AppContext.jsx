import { createContext, useState, useEffect } from "react";

import toast from "react-hot-toast";
import axios from "../lib/axios.js";


export const AppContent = createContext();
export const AppContextProvider = (props)=>{


    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(false)

    const getAuthStatus = async()=>{
        try {
            const {data} = await axios.get('/auth/is-auth')
            if(data.success){
                setIsLoggedIn(true)
                await getUserData();
            }else{
                setIsLoggedIn(false);
                setUserData(null);
            }
        } catch (error) {
             console.log('Error in getAuthStatus function', error);
            setIsLoggedIn(false);
            setUserData(null);
            // Don't show error toast on initial load if user is just not logged in
            if (error.response?.status !== 401) {
                toast.error(error.response?.data?.message || 'Authentication check failed');
            }
        }
    }
    

    const getUserData = async ()=>{
            try {
                const res = await axios.post('/users')
                setUserData(res.data)
                console.log(res.data);
            } catch (error) {
                console.log('Error in get all data query', error);
                toast.error(error.response.data.message)
            }
    }

    useEffect(()=>{
        getAuthStatus()
    },[])


    const value ={
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userData, setUserData,
        getUserData,
        getAuthStatus,
    }

    return(
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}

