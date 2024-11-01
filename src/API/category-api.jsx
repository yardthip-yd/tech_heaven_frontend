import axios from "../config/axios"

export const createCategory = async(form) => {
    return axios.post("http://localhost:8000/category", form)
}

export const listCategory = async() => {
    return axios.get("http://localhost:8000/category")
}
export const updateCategory = async(id, form) => {
    return axios.put("http://localhost:8000/category/" +id, form)
}

export const removeCategory = async(id) => {
    return axios.delete("http://localhost:8000/category/" +id)
}