import axios from '../config/axios';

export const createCart = (cartData) => {
    console.log("gorjkwpo")
    return axios.post('http://localhost:8000/cart',cartData)
}

export const getCart = (userId) => {

    return axios.get(`http://localhost:8000/cart/get-cart/${userId}`)
}

export const deleteCartItem = (id) => {

    return axios.delete("http://localhost:8000/cart/delete-cart_item/" + id,)
}

export const updateCartItem = async (cartItemId, data) => {
    return axios.put(`http://localhost:8000/cart/update-cart_item/${cartItemId}`, data);
};
