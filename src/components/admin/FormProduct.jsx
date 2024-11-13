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
  createProductAccessory,
} from "@/API/product-api";
import { toast } from "react-toastify";
import useProductStore from "@/stores/productStore";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import moment from "moment";

const FormProduct = () => {
  const token = useAuthStore((state) => state.token);
  const getCategory = useCategoryStore((state) => state.getCategory);
  const categories = useCategoryStore((state) => state.categories);
  const actionListProducts = useProductStore(
    (state) => state.actionListProducts
  );
  const products = useProductStore((state) => state.products);
  const actionDeleteProduct = useProductStore(
    (state) => state.actionDeleteProduct
  );
  // console.log(products);

  const [form, setForm] = useState({
    images: [],
  });
  // console.log("form", form);
  const [image, setImage] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // state สำหรับเก็บคีย์เวิร์ดการค้นหา
  const [isLoading, setIsLoading] = useState(false);

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
    };
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
        case "10": // Accessory
          response = await createProductAccessory(allProducts);
          // console.log("Accessory");
          break;
        default:
          throw new Error("Invalid category selected");
      }

      toast.success("Product created successfully!");
      // console.log("Product created successfully!");
      setForm({});
      setSelectedCategory(0); // รีเซ็ต selectedCategory เป็น null
      setImage([]);
      if (inputImageRef.current) {
        inputImageRef.current.value = "";
      }

      // await actionListProducts(100);
      setIsLoading(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete id:${id}?`)) {
      try {
        const res = await actionDeleteProduct(id);
        console.log(res);
        toast.success("Deleted Success!!!");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // อัปเดตค่าการค้นหา
  };

  // กรองข้อมูลสินค้าให้ตรงกับคีย์เวิร์ดการค้นหา
  const filteredProducts = products.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoryId.toString() === searchTerm // กรองตามชื่อหรือหมวดหมู่
  );

  return isLoading ? (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-8 h-8 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <span className="text-gray-500">Loading...</span>
    </div>
  ) : (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Info:</h1>
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
        <Uploadfile
          // form={image || []}
          form={form}
          setForm={setImage}
          setForm2={setForm}
          inputImageRef={inputImageRef}
        />

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

        {/*Accessory Product*/}
        {selectedCategory === "10" && (
          <div>
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

            <label>Accessories Type:</label>
            <select
              className="border"
              value={form.accessoriesType || ""}
              onChange={handleOnChange}
              name="accessoriesType"
            >
              <option value="" disabled>
                Please Select
              </option>
              <option value="MOUSE">Mouse</option>
              <option value="KEYBOARD">Keyboard</option>
              <option value="CHAIR">Chair</option>
              <option value="HEADPHONE">Headphone</option>
              <option value="MICROPHONE">Microphone</option>
              <option value="SPEAKER">Speaker</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        )}

        <button className="bg-blue-500 p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200">
          เพิ่มสินค้า
        </button>
      </form>

      {/* Products Table */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Product List:</h2>
        {/* กล่องค้นหา */}
        <input
          type="text"
          placeholder="ค้นหาสินค้า"
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 mb-4"
        />
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 font-semibold text-left">#</th>
              <th className="py-3 px-6 font-semibold text-left">Image</th>
              <th className="py-3 px-6 font-semibold text-left">Name</th>
              <th className="py-3 px-6 font-semibold text-left">Description</th>
              <th className="py-3 px-6 font-semibold text-left">Price</th>
              <th className="py-3 px-6 font-semibold text-left">Stock</th>
              <th className="py-3 px-6 font-semibold text-left">CategoryId</th>
              <th className="py-3 px-6 font-semibold text-left">UpdatedAt</th>
              <th className="py-3 px-6 font-semibold text-left">Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">
                  {item?.ProductImages && item?.ProductImages.length > 0 ? (
                    <img
                      className="w-24 h-24 object-cover rounded-lg shadow-sm"
                      src={item.ProductImages[0].imageUrl}
                      alt={item.name}
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-lg">
                      No Image
                    </div>
                  )}
                </td>
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">{item.description}</td>
                <td className="py-3 px-6">{item.price}</td>
                <td className="py-3 px-6">{item.stock}</td>
                <td className="py-3 px-6">{item.categoryId}</td>
                <td className="py-3 px-6">
                  {moment(item.updatedAt).format("LLL")}
                </td>
                <td className="py-3 px-6 flex gap-2">
                  <Link
                    to={`/admin/product/${item.id}`}
                    className="bg-yellow-500 p-2 rounded-md shadow-md text-white hover:bg-yellow-600 transition duration-200"
                  >
                    <Pencil />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 p-2 rounded-md shadow-md text-white hover:bg-red-600 transition duration-200"
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormProduct;

