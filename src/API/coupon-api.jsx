import axios from "../config/axios";

export const createCoupon = async(body) => {
    return axios.post("/admin/createCoupon",body)
}

export const getCoupon = async() => {
    return axios.get("/admin/getCoupon")
}

export const deleteCoupon = async(couponId)=> {
    return axios.delete(`/admin/deleteCoupon/${couponId}`)
}

export const applyCoupon = async(promotionCode) => {
    return axios.patch("/cart/applyCoupon", {coupon : promotionCode})
}
export const editCoupon = async(couponId,form) => {
    return axios.put(`/admin/editCoupon/${couponId}`,form)
}