import axios from "../config/axios";

export const createCoupon = async(body) => {
    return axios.post("/admin/createCoupon",body)
}

export const getCoupon = async() => {
    return axios.get("/admin/getCoupon")
}

export const applyCoupon = async() => {
    return axios.patch("/cart/applyCoupon")
}