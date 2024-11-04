import axios from "axios"

// create products
export const createProductCPU = async(form) => {
    return axios.post("http://localhost:8000/product/cpu", form)
}

export const createProductMonitor = async(form) => {
    return axios.post("http://localhost:8000/product/monitor", form)
}

export const createProductCPUCooler = async(form) => {
    return axios.post("http://localhost:8000/product/cpucooler", form)
}

export const createProductPowerSupply = async(form) => {
    return axios.post("http://localhost:8000/product/powersupply", form)
}

export const createProductCase = async(form) => {
    return axios.post("http://localhost:8000/product/case", form)
}

export const createProductGPU = async(form) => {
    return axios.post("http://localhost:8000/product/gpu", form)
}

export const createProductMemory = async(form) => {
    return axios.post("http://localhost:8000/product/memory", form)
}

export const createProductMotherboard = async(token, form) => {
    return axios.post("http://localhost:8000/product/motherboard", form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const createProductDrive = async(token, form) => {
    return axios.post("http://localhost:8000/product/drive", form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// ------------------------------------------------------------------------//

// โชว์ข้อมูลตามจำนวนที่กำหนด
export const listProducts = async(count = 20) => {
    return axios.get("http://localhost:8000/products/" + count)
}

// ------------------------------------------------------------------------//

// โชว์ข้อมูลทั้งหมด
export const readProducts = async(token, id) => {
    return axios.get("http://localhost:8000/product/" + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// ------------------------------------------------------------------------//

// ลบข้อมูล
export const deleteProduct = async(token, id) => {
    return axios.get("http://localhost:8000/product/" + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// ------------------------------------------------------------------------//

// อัพดตข้อมูล
export const updateProduct = async(token, id, form) => {
    return axios.get("http://localhost:8000/product/" + id, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// ------------------------------------------------------------------------//

// อัพโหลดไฟล์
export const uploadFiles = async (token, form) => {
    // code 
    // console.log('form api frontent', form)
    return axios.post('http://localhost:8000/images', {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// ------------------------------------------------------------------------//

// ลบไฟล์
export const removeFiles = async (token, public_id) => {
    // code 
    // console.log('form api frontent', form)
    return axios.post('http://localhost:8000/removeimages', {
        public_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// ------------------------------------------------------------------------//

// search
export const searchFilters = async (arg) => {
    // code body
    return axios.post('http://localhost:8000/search/filters',arg)
}