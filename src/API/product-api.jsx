import axios from "../config/axios";

// create products
export const createProductCPU = async (form) => {
  return await axios.post("/product/cpu", form);
};

export const createProductMonitor = async (form) => {
  return await axios.post("/product/monitor", form);
};

export const createProductCPUCooler = async (form) => {
  return await axios.post("/product/cpucooler", form);
};

export const createProductPowerSupply = async (form) => {
  return await axios.post("/product/powersupply", form);
};

export const createProductCase = async (form) => {
  return await axios.post("/product/case", form);
};

export const createProductGPU = async (form) => {
  return await axios.post("/product/gpu", form);
};

export const createProductMemory = async (form) => {
  return await axios.post("/product/memory", form);
};

export const createProductMotherboard = async (form) => {
  return await axios.post("/product/motherboard", form);
};

export const createProductDrive = async (form) => {
  return await axios.post("/product/drive", form);
};

export const createProductAccessory = async (form) => {
  return await axios.post("/product/accessory", form);
};

export const createOtherProduct = async (form) => {
  return await axios.post("/product/other", form);
};
// ------------------------------------------------------------------------//

// โชว์ข้อมูลตามจำนวนที่กำหนด
export const listProducts = async (count) => {
  return await axios.get("/products/" + count);
};

// ------------------------------------------------------------------------//

// โชว์ข้อมูลทั้งหมด
export const readProducts = async (id) => {
  return await axios.get("/product/" + id);
};

// ------------------------------------------------------------------------//

// ลบข้อมูล
export const deleteProduct = async (id) => {
  return await axios.delete("/product/" + id);
};

// ------------------------------------------------------------------------//

// อัพดตข้อมูล
export const updateProduct = async (id, form) => {
  return await axios.put("/product/" + id, form);
};

// ------------------------------------------------------------------------//

// อัพโหลดไฟล์
export const uploadFiles = async (form) => {
  // code
  // console.log('form api frontent', form)
  return await axios.post("/images", {
    image: form,
  });
};

// ------------------------------------------------------------------------//

// ลบไฟล์
export const removeFiles = async (public_id) => {
  // code
  // console.log('form api frontent', form)
  return await axios.post("/removeimages", {
    public_id,
  });
};

// ------------------------------------------------------------------------//

// search
export const searchFilters = async (arg) => {
  // code body
  return await axios.post("/search/filters", arg);
};

// deleteImage
export const deleteProductImage = async (public_id) => {
  return await axios.post("/remove-product-image", {
    public_id,
  });
};

// ชั่วคราวระหว่างรอพี่อู๊ดแก้

export const getAllProduct = async (count) => {
  try {
    const response = await axios.get(`/products/${count}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/////FOR PC BUILD
export const getProductByCategory = async (categoryId, filter) =>
  await axios.post(`/pcbuild/products-by-category/${categoryId}`, filter);
export const createPCBuild = async (form) =>
  await axios.post("/pcbuild/create-build", form);
export const getPCBuildList = async () =>
  await axios.get("/pcbuild/get-build-list");
