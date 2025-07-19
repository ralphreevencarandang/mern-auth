import {create} from 'zustand';

export const useCheckAuth = create((set)=>({

    isLoggedIn: false,
    setIsLoggedIn: (value)=> set(()=>({ isLoggedIn: value})),
}))
