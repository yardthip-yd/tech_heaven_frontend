import axios from "../config/axios"


export const getDashBoard = async() => {
    return axios.get("http://localhost:8000/dashboard")
}