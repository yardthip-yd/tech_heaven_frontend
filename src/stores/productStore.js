// import { create } from 'zustand';
// import axios from 'axios';

// import {deleteProduct, listProducts, readProducts, searchFilters, updateProduct  } from "../API/product-api.jsx";


// const useProductStore = create((set) => ({
//   products: [],
//   product: null,
//   error: null,

//   // ดึงข้อมูลสินค้าทั้งหมดตามจำนวนที่ระบุ
//   actionListProducts: async (count) => {
//     try {
//       const response = await listProducts(count);
//       set({ products: response.data });
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       set({ error: "Error fetching products" });
//     }
//   },

//   // ดึงข้อมูลสินค้าตาม ID
//   actionReadProducts: async (id) => {
//     try {
//       const response = await readProducts(id);
//       set({ product: response.data });
//     } catch (error) {
//       console.error("Error fetching product by ID:", error);
//       set({ error: "Error fetching product by ID" });
//     }
//   },

//   // สร้างข้อมูลสินค้าใหม่ตามประเภท (เช่น CPU, Monitor)
//   createProduct: async (type, productData) => {
//     try {
//       const response = await axios.post(`/product/${type}`, productData);
//       set((state) => ({
//         products: [...state.products, response.data.data.product],
//       }));
//     } catch (error) {
//       console.error(`Error creating product ${type}:`, error);
//       set({ error: `Error creating product ${type}` });
//     }
//   },

//   // อัปเดตข้อมูลสินค้า
//   actionUpdateProduct: async (id, form) => {
//     try {
//       const response = await updateProduct(id, form)
//       set((state) => ({
//         products: state.products.map((product) =>
//           product.id === id ? response.data.data : product
//         ),
//       }));
//     } catch (error) {
//       console.error("Error updating product:", error);
//       set({ error: "Error updating product" });
//     }
//   },

//   // ลบข้อมูลสินค้า
//   actionDeleteProduct: async (id) => {
//     try {
//       await deleteProduct(id)
//       set((state) => ({
//         products: state.products.filter((product) => product.id !== id),
//       }));
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       set({ error: "Error deleting product" });
//     }
//   },

//   // เรียกดูสินค้าตาม Category ID
//   listByCategory: async (categoryId) => {
//     try {
//       const response = await axios.post('/productby', { categoryId });
//       set({ products: response.data.data });
//     } catch (error) {
//       console.error("Error listing products by category:", error);
//       set({ error: "Error listing products by category" });
//     }
//   },

//   // ค้นหาสินค้าตามเงื่อนไข
//   actionSearchFilters: async () => {
//     try {
//       const response = await searchFilters()
//       set({ products: response.data });
//     } catch (error) {
//       console.error("Error searching products:", error);
//       set({ error: "Error searching products" });
//     }
//   },
// }));

// export default useProductStore;



import { create } from 'zustand';
import axios from 'axios';
import {
  deleteProduct,
  listProducts,
  readProducts,
  searchFilters,
  updateProduct,
  createProductCPU,
  createProductMonitor,
  createProductCPUCooler,
  createProductPowerSupply,
  createProductCase,
  createProductGPU,
  createProductMemory,
  createProductMotherboard,
  createProductDrive
} from "../API/product-api";

import {getAllProduct} from "../API/product-api"

const useProductStore = create((set) => ({
  products: [],
  product: null,
  error: null,

  // ดึงข้อมูลสินค้าทั้งหมดตามจำนวนที่ระบุ
  actionListProducts: async (count) => {
    try {
      const response = await listProducts(count);
      set({ products: response.data });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ error: "Error fetching products" });
    }
  },

  // ดึงข้อมูลสินค้าตาม ID
  actionReadProducts: async (id) => {
    try {
      const response = await readProducts(id);
      set({ product: response.data });
      return response.data
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      set({ error: "Error fetching product by ID" });
    }
  },

  // สร้างข้อมูลสินค้าใหม่ตามประเภท (เช่น CPU, Monitor)
  createProduct: async (type, productData) => {
    try {
      let response;
      switch (type) {
        case 'cpu':
          response = await createProductCPU(productData);
          break;
        case 'monitor':
          response = await createProductMonitor(productData);
          break;
        case 'cpucooler':
          response = await createProductCPUCooler(productData);
          break;
        case 'powersupply':
          response = await createProductPowerSupply(productData);
          break;
        case 'case':
          response = await createProductCase(productData);
          break;
        case 'gpu':
          response = await createProductGPU(productData);
          break;
        case 'memory':
          response = await createProductMemory(productData);
          break;
        case 'motherboard':
          response = await createProductMotherboard(productData);
          break;
        case 'drive':
          response = await createProductDrive(productData);
          break;
        default:
          throw new Error("Unknown product type");
      }
      set((state) => ({
        products: [...state.products, response.data.data.product],
      }));
    } catch (error) {
      console.error(`Error creating product ${type}:`, error);
      set({ error: `Error creating product ${type}` });
    }
  },

  // อัปเดตข้อมูลสินค้า
  actionUpdateProduct: async (id, form) => {
    try {
      const response = await updateProduct(id, form);
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? response.data.data : product
        ),
      }));
    } catch (error) {
      console.error("Error updating product:", error);
      set({ error: "Error updating product" });
    }
  },


  // ลบข้อมูลสินค้า
  actionDeleteProduct: async (id) => {
    try {
      await deleteProduct(id);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting product:", error);
      set({ error: "Error deleting product" });
    }
  },

  
  // ค้นหาสินค้าตามเงื่อนไข
  actionSearchFilters: async () => {
    try {
      const response = await searchFilters();
      set({ products: response.data });
    } catch (error) {
      console.error("Error searching products:", error);
      set({ error: "Error searching products" });
    }
  },


  // เรียกดูสินค้าตาม Category ID
  listByCategory: async (categoryId) => {
    try {
      const response = await axios.post('/productby', { categoryId });
      set({ products: response.data.data });
    } catch (error) {
      console.error("Error listing products by category:", error);
      set({ error: "Error listing products by category" });
    }
  },

  // ค้นหาสินค้าตามเงื่อนไข
  searchProducts: async (filters) => {
    try {
      const response = await axios.post('/search/filters', filters);
      set({ products: response.data });
    } catch (error) {
      console.error("Error searching products:", error);
      set({ error: "Error searching products" });
    }
},

// ชั่วคราวระหว่างรอพี่อู๊ดแก้

  actionGetAllProducts: async (count = 15) => {
    set({ loading: true, error: null });
    try {
      const response = await getAllProduct(count);
      set({ products: response, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useProductStore;
