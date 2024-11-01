import axios from "axios";

export const stripeApi = async (token) => {
    return await axios.post("http://localhost:8000/payment/create-payment", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}