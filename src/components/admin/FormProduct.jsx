import React, { useEffect, useRef, useState } from "react";
import Uploadfile from "./Uploadfile";
import useAuthStore from "@/stores/authStore";
import useCategoryStore from "@/stores/category";
import {
  createProductCPU,
  createProductMonitor,
  createProductGPU,
  createProductPowerSupply,
  createProductCase,
  createProductMemory,
  createProductMotherboard,
  createProductDrive,
  createProductCPUCooler,
} from "@/API/product-api";
import { toast } from "react-toastify";
import useProductStore from "@/stores/productStore";
import { Link } from "react-router-dom";
const FormProduct = () => {
  const token = useAuthStore((state) => state.token);
  const getCategory = useCategoryStore((state) => state.getCategory);
  const categories = useCategoryStore((state) => state.categories);
  const actionListProducts = useProductStore((state) => state.actionListProducts);
  const products = useProductStore((state) => state.products);
  const actionDeleteProduct = useProductStore((state) => state.actionDeleteProduct)
  // console.log(products);

  const [form, setForm] = useState({
    images: []
  });
  const [image, setImage] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(0);


  const inputImageRef = useRef(null);

  useEffect(() => {
    getCategory();
    actionListProducts(100);
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "categoryId") {
      console.log(e.target.value);
      setSelectedCategory(e.target.value); // อัปเดต category ที่เลือก
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // return console.log(image, form, selectedCategory);
    const allProducts = {
      image: image,
      form: form,
      selectedCategory: selectedCategory,
    }
    try {
      let response;

      // สร้างสินค้าโดยขึ้นอยู่กับหมวดหมู่ที่เลือก
      switch (selectedCategory) {
        case "1": // CPU
          response = await createProductCPU(allProducts);
          // console.log("CPU")
          break;
        case "2": // Monitor
          response = await createProductMonitor(allProducts);
          // console.log("Monitor")
          break;
        case "3": // CPU Cooler
          response = await createProductCPUCooler(allProducts);
          // console.log("CPU Cooler")
          break;
        case "4": // Power Supply
          response = await createProductPowerSupply(allProducts);
          // console.log("Power Supply")
          break;
        case "5": // Case
          response = await createProductCase(allProducts);
          // console.log("Case")
          break;
        case "6": // GPU
          response = await createProductGPU(allProducts);
          // console.log("GPU")
          break;
        case "7": // Memory
          response = await createProductMemory(allProducts);
          // console.log("Memory")
          break;
        case "8": // Motherboard
          response = await createProductMotherboard(allProducts);
          // console.log("Motherboard")
          break;
        case "9": // Drive
          response = await createProductDrive(allProducts);
          // console.log("Drive");
          break;
        default:
          throw new Error("Invalid category selected");
      }

      toast.success("Product created successfully!");
      // console.log("Product created successfully!");
      setForm({});
      setSelectedCategory(0); // รีเซ็ต selectedCategory เป็น null
      setImage([])
      if (inputImageRef.current) {
        inputImageRef.current.value = "";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async(id) => {
    if(window.confirm(`Are you sure you want to delete id:${id}?`)){
      try {
        const res = await actionDeleteProduct(id)
        console.log(res)
        toast.success('Deleted Success!!!')
        
      } catch (err) {
        console.log(err)
      }

    }
  }


  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <label>Name:</label>
        <input
          className="border"
          value={form.name || ""}
          onChange={handleOnChange}
          placeholder="Name"
          name="name"
        />
        <label>Description:</label>
        <input
          className="border"
          value={form.description || ""}
          onChange={handleOnChange}
          placeholder="Description"
          name="description"
        />
        <label>Price:</label>
        <input
          type="number"
          className="border"
          value={form.price || ""}
          onChange={handleOnChange}
          placeholder="Price"
          name="price"
        />
        <label>stock:</label>
        <input
          type="number"
          className="border"
          value={form.stock || ""}
          onChange={handleOnChange}
          placeholder="Stock"
          name="stock"
        />
        <label>Category:</label>
        <select
          value={selectedCategory}
          className="border"
          name="categoryId"
          onChange={handleOnChange}
          required
        >
          <option value={0} disabled>
            Please Select
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Upload file */}
          <Uploadfile form={image} setForm={setImage} inputImageRef={inputImageRef}/>

        {/* Conditional rendering for additional fields */}

        {/*CPU Product*/}
        {selectedCategory === "1" && (
          <div>
            <label>Name:</label>
            <input
              className="border"
              value={form.name || ""}
              onChange={handleOnChange}
              placeholder="Name"
              name="name"
            />
            <label>Model:</label>
            <input
              className="border"
              value={form.model || ""}
              onChange={handleOnChange}
              placeholder="Model"
              name="model"
            />
            <label>Socket:</label>
            <input
              className="border"
              value={form.socket || ""}
              onChange={handleOnChange}
              placeholder="Socket"
              name="socket"
            />
            <label>Cores:</label>
            <input
              type="number"
              className="border"
              value={form.cores || ""}
              onChange={handleOnChange}
              placeholder="Cores"
              name="cores"
            />
            <label>Threads:</label>
            <input
              type="number"
              className="border"
              value={form.threads || ""}
              onChange={handleOnChange}
              placeholder="Threads"
              name="threads"
            />
            <label>BaseClock:</label>
            <input
              type="number"
              className="border"
              value={form.baseClock || ""}
              onChange={handleOnChange}
              placeholder="BaseClock"
              name="baseClock"
            />
            <label>BoostClock:</label>
            <input
              type="number"
              className="border"
              value={form.boostClock || ""}
              onChange={handleOnChange}
              placeholder="BoostClock"
              name="boostClock"
            />
            <label>Description:</label>
            <input
              className="border"
              value={form.description || ""}
              onChange={handleOnChange}
              placeholder="Description"
              name="description"
            />
          </div>
        )}

        {/*Monitor Product*/}
        {selectedCategory === "2" && (
          <div>
            <label>Name:</label>
            <input
              className="border"
              value={form.name || ""}
              onChange={handleOnChange}
              placeholder="Name"
              name="name"
            />
            <label>Model:</label>
            <input
              className="border"
              value={form.model || ""}
              onChange={handleOnChange}
              placeholder="Model"
              name="model"
            />
            <label>Size:</label>
            <input
              type="number"
              className="border"
              value={form.size || ""}
              onChange={handleOnChange}
              placeholder="Size"
              name="size"
            />
            <label>Resolution:</label>
            <input
              className="border"
              value={form.resolution || ""}
              onChange={handleOnChange}
              placeholder="Resolution"
              name="resolution"
            />
            <label>RefreshRate:</label>
            <input
              type="number"
              className="border"
              value={form.refreshRate || ""}
              onChange={handleOnChange}
              placeholder="RefreshRate"
              name="refreshRate"
            />
            <label>PanelType:</label>
            <input
              className="border"
              value={form.panelType || ""}
              onChange={handleOnChange}
              placeholder="PanelType"
              name="panelType"
            />
          </div>
        )}

        {/*CPUCooler Product*/}
        {selectedCategory === "3" && (
          <div>
            <label>Name:</label>
            <input
              className="border"
              value={form.name || ""}
              onChange={handleOnChange}
              placeholder="Name"
              name="name"
            />
            <label>Model:</label>
            <input
              className="border"
              value={form.model || ""}
              onChange={handleOnChange}
              placeholder="Model"
              name="model"
            />
            <label>Socket:</label>
            <input
              className="border"
              value={form.socket || ""}
              onChange={handleOnChange}
              placeholder="Socket"
              name="socket"
            />
            <label>Radiator:</label>
            <input
              type="number"
              className="border"
              value={form.radiator || ""}
              onChange={handleOnChange}
              placeholder="Radiator"
              name="radiator"
            />

            {/* Radio buttons for Type */}
            <div>
              <label>Type:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="AIR"
                    checked={form.type === "AIR"}
                    onChange={handleOnChange}
                  />
                  AIR
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="LIQUID"
                    checked={form.type === "LIQUID"}
                    onChange={handleOnChange}
                  />
                  LIQUID
                </label>
              </div>
            </div>
          </div>
        )}

        {/*PowerSupply Product*/}
        {selectedCategory === "4" && (
          <div>
            <label>Name:</label>
            <input
              className="border"
              value={form.name || ""}
              onChange={handleOnChange}
              placeholder="Name"
              name="name"
            />
            <label>Model:</label>
            <input
              className="border"
              value={form.model || ""}
              onChange={handleOnChange}
              placeholder="Model"
              name="model"
            />
            <label>Wattage:</label>
            <input
              type="number"
              className="border"
              value={form.wattage || ""}
              onChange={handleOnChange}
              placeholder="Wattage"
              name="wattage"
            />
          </div>
        )}

        {/*Case Product*/}
        {selectedCategory === "5" && (
          <div>
            <label>Name:</label>
            <input
              className="border"
              value={form.name || ""}
              onChange={handleOnChange}
              placeholder="Name"
              name="name"
            />
            <label>Model:</label>
            <input
              className="border"
              value={form.model || ""}
              onChange={handleOnChange}
              placeholder="Model"
              name="model"
            />
            <label>Size:</label>
            <input
              className="border"
              value={form.size || ""}
              onChange={handleOnChange}
              placeholder="Size"
              name="size"
            />
          </div>
        )}

        {/*GPU Product*/}
        {selectedCategory === "6" && (
          <div>
            <label>Name:</label>
            <input
              className="border"
              value={form.name || ""}
              onChange={handleOnChange}
              placeholder="Name"
              name="name"
            />
            <label>Model:</label>
            <input
              className="border"
              value={form.model || ""}
              onChange={handleOnChange}
              placeholder="Model"
              name="model"
            />
            <label>Vram:</label>
            <input
              type="number"
              className="border"
              value={form.vram || ""}
              onChange={handleOnChange}
              placeholder="Vram"
              name="vram"
            />
            <label>Power:</label>
            <input
              type="number"
              className="border"
              value={form.power || ""}
              onChange={handleOnChange}
              placeholder="Power"
              name="power"
            />
          </div>
        )}

        {/*Memory Product*/}
        {selectedCategory === "7" && (
          <div>
            <label>Name:</label>
            <input
              className="border"
              value={form.name || ""}
              onChange={handleOnChange}
              placeholder="Name"
              name="name"
            />
            <label>Model:</label>
            <input
              className="border"
              value={form.model || ""}
              onChange={handleOnChange}
              placeholder="Model"
              name="model"
            />
            <label>Memory:</label>
            <input
              type="number"
              className="border"
              value={form.memory || ""}
              onChange={handleOnChange}
              placeholder="Memory"
              name="memory"
            />
            <label>BusSpeed:</label>
            <input
              type="number"
              className="border"
              value={form.busSpeed || ""}
              onChange={handleOnChange}
              placeholder="BusSpeed"
              name="busSpeed"
            />
            <label>Type:</label>
            <input
              className="border"
              value={form.type || ""}
              onChange={handleOnChange}
              placeholder="Type"
              name="type"
            />
          </div>
        )}

        {/*Motherboard Product*/}
        {selectedCategory === "8" && (
          <div>
            <label>Name:</label>
            <input
              className="border"
              value={form.name || ""}
              onChange={handleOnChange}
              placeholder="Name"
              name="name"
            />
            <label>Model:</label>
            <input
              className="border"
              value={form.model || ""}
              onChange={handleOnChange}
              placeholder="Model"
              name="model"
            />
            <label>Socket:</label>
            <input
              className="border"
              value={form.socket || ""}
              onChange={handleOnChange}
              placeholder="Socket"
              name="socket"
            />
            <label>Chipset:</label>
            <input
              className="border"
              value={form.chipset || ""}
              onChange={handleOnChange}
              placeholder="Chipset"
              name="chipset"
            />
          </div>
        )}

        {/*Drive Product*/}
        {selectedCategory === "9" && (
          <div>
            <label>Name:</label>
            <input
              className="border"
              value={form.name || ""}
              onChange={handleOnChange}
              placeholder="Name"
              name="name"
            />
            <label>Model:</label>
            <input
              className="border"
              value={form.model || ""}
              onChange={handleOnChange}
              placeholder="Model"
              name="model"
            />
            <label>Size:</label>
            <input
              className="border"
              value={form.size || ""}
              onChange={handleOnChange}
              placeholder="Size"
              name="size"
            />

            {/* Radio buttons for Type */}
            <div>
              <label>Type:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="HDD"
                    checked={form.type === "HDD"}
                    onChange={handleOnChange}
                  />
                  HDD
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="SSD"
                    checked={form.type === "SSD"}
                    onChange={handleOnChange}
                  />
                  SSD
                </label>
              </div>
            </div>

            {/* Radio buttons for Format */}
            <div>
              <label>Format:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="format"
                    value="SATA"
                    checked={form.format === "SATA"}
                    onChange={handleOnChange}
                  />
                  SATA
                </label>
                <label>
                  <input
                    type="radio"
                    name="format"
                    value="M_2"
                    checked={form.format === "M_2"}
                    onChange={handleOnChange}
                  />
                  M.2
                </label>
              </div>
            </div>
            <label>Speed:</label>
            <input
              className="border"
              value={form.speed || ""}
              onChange={handleOnChange}
              placeholder="Speed"
              name="speed"
            />
          </div>
        )}

        <button className="bg-blue-500">เพิ่มสินค้า</button>

        <hr />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">CategoryId</th>
              <th scope="col">UpdatedAt</th>
              <th scope="col">Manage</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              // console.log(item);
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>

                  <td>
                    {
                      item?.ProductImages && item?.ProductImages.length > 0
                      ? <img
                        className="w-24 h-24 rounded-lg shadow-md"
                        src={item.ProductImages[0]
                          .imageUrl
                          } />
                      : <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center shadow-sm">No Image</div>
                    }

                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>{item.categoryId}</td>
                  <td>{item.updatedAt}</td>
                  <td className="flex gap-2">
                    <p className="bg-yellow-500 rounded-md p-1 shadow-md">
                      <Link to={'/admin/product/' +item.id}>
                        Edit 
                      </Link>
                    </p>
                    <p 
                      className="bg-red-500 rounded-md p-1 shadow-md"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;