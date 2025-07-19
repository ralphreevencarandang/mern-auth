import axios from "axios";

const BASE_URL = import.meta.env.MODE == 'development' ? 'http://localhost:5001/api' : ''
const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials:true
})

export default instance