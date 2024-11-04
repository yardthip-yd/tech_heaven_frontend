import axios from "axios"

// create products
export const createProductCPU = async(token, form) => {
    return axios.post("http://localhost:8000/product/cpu", form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const createProductMonitor = async(token, form) => {
    return axios.post("http://localhost:8000/product/monitor", form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const createProductCPUCooler = async(token, form) => {
    return axios.post("http://localhost:8000/product/cpucooler", form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const createProductPowerSupply = async(token, form) => {
    return axios.post("http://localhost:8000/product/powersupply", form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const createProductCase = async(token, form) => {
    return axios.post("http://localhost:8000/product/case", form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const createProductGPU = async(token, form) => {
    return axios.post("http://localhost:8000/product/gpu", form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const createProductMemory = async(token, form) => {
    return axios.post("http://localhost:8000/product/memory", form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
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

// ชั่วคราวระหว่างรอพี่อู๊ดแก้

export const getAllProduct = async (count) => {
  try {
    const response = await axios.get(`http://localhost:8000/products/${count}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
