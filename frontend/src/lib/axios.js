import axios from "axios";

const BASE_URL = import.meta.env.MODE == 'development' ? 'http://localhost:5001/api' : 'https://mern-auth-g19y.onrender.com/api'
const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials:true
})

export default instance