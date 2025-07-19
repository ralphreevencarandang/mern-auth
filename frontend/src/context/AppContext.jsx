import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "../lib/axios.js";


export const AppContent = createContext();
export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState()

    const getUserData = async ()=>{
            try {
                const res = await axios.post('/users')
                // setUserData(res.data)
                console.log(res.data);
            } catch (error) {
                console.log('Error in get all data query', error);
                toast.error(error.response.data.message)
            }
    }


    const value ={
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userData, setUserData,
        getUserData
    }

    return(
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}

