import { BASE_URL } from "@/context/config";
import _axios from "axios";

const axios = _axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    validateStatus: (statusCode: number) => {
        return (statusCode === 200 || statusCode === 400 || statusCode === 401)
    }
})

export default axios;