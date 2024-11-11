import React, { useEffect, useRef, useState } from "react";
import useAuthStore from "@/stores/authStore";
import useCategoryStore from "@/stores/category";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "@/stores/productStore";
import UploadFileEditProduct from "./UploadfileEditProduct";

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const getCategory = useCategoryStore((state) => state.getCategory);
  const categories = useCategoryStore((state) => state.categories);
  const actionReadProducts = useProductStore(
    (state) => state.actionReadProducts
  );
  const actionUpdateProduct = useProductStore(
    (state) => state.actionUpdateProduct
  );

  const [form, setForm] = useState({
    images: [],
  });

  const [image, setImage] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const inputImageRef = useRef(null);

  useEffect(() => {
    // getCategory();
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const resp = await actionReadProducts(id);
      console.log("resp----------------", resp);
      setSelectedCategory(String(resp.categoryId));

      // แปลงข้อมูลรูปภาพ
      const formattedImages = resp.ProductImages.map((img) => ({
        public_id: img.public_id,
        secure_url: img.imageUrl, // หรือ img.url ขึ้นอยู่กับ response ที่ได้
      }));

      setImage(formattedImages); // ใช้ setImage แทน

      const formBody = {
        name: resp.name,
        description: resp.description,
        price: resp.price,
        categoryId: resp.categoryId,
        stock: resp.stock,
      };
      // ใช้ switch-case เพื่อจัดการกับ categoryId
      switch (String(resp.categoryId)) {
        case "1": // CPU
          formBody.model = resp.CPU[0].model;
          formBody.socket = resp.CPU[0].socket;
          formBody.cores = resp.CPU[0].cores;
          formBody.threads = resp.CPU[0].threads;
          formBody.baseClock = resp.CPU[0].baseClock;
          formBody.boostClock = resp.CPU[0].boostClock;
          break;
        case "2": // Monitor
          formBody.model = resp.Monitor[0].model;
          formBody.size = resp.Monitor[0].size;
          formBody.resolution = resp.Monitor[0].resolution;
          formBody.refreshRate = resp.Monitor[0].refreshRate;
          formBody.panelType = resp.Monitor[0].panelType;
          break;
        case "3": // CPU Cooler
          formBody.model = resp.CPUCooler[0].model;
          formBody.socket = resp.CPUCooler[0].socket;
          formBody.radiator = resp.CPUCooler[0].radiator;
          formBody.type = resp.CPUCooler[0].type;
          break;
        case "4": // Power Supply
          formBody.model = resp.PowerSupply[0].model;
          formBody.wattage = resp.PowerSupply[0].wattage;
          break;
        case "5": // Case
          formBody.model = resp.Case[0].model;
          formBody.size = resp.Case[0].size;
          break;
        case "6": // GPU
          formBody.model = resp.GPU[0].model;
          formBody.vram = resp.GPU[0].vram;
          formBody.power = resp.GPU[0].power;
          break;
        case "7": // Memory
          formBody.model = resp.Memory[0].model;
          formBody.memory = resp.Memory[0].memory;
          formBody.busSpeed = resp.Memory[0].busSpeed;
          formBody.type = resp.Memory[0].type;
          break;
        case "8": // Motherboard
          formBody.model = resp.Motherboard[0].model;
          formBody.socket = resp.Motherboard[0].socket;
          formBody.chipset = resp.Motherboard[0].chipset;
          break;
        case "9": // Drive
          formBody.model = resp.Drive[0].model;
          formBody.size = resp.Drive[0].size;
          formBody.type = resp.Drive[0].type;
          formBody.format = resp.Drive[0].format;
          formBody.speed = resp.Drive[0].speed;
          break;
        case "10": // Accessory
          formBody.accessoriesType = resp.Accessory[0].accessoriesType;
          break;
        default:
          throw new Error("Invalid categoryId");
      }

      setForm(formBody);
    } catch (err) {
      console.log(err);
    }
  };

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
    console.log("formbody555555", form);
    e.preventDefault();

    // ตรวจสอบความถูกต้องของข้อมูล
    if (!form.name || !form.description || !form.price || !selectedCategory || !form.stock) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // const allProducts = {
    //   image: image,
    //   form: form,
    //   selectedCategory: selectedCategory,
    // };

    // console.log("Attempting to update product with ID:", id);
    // console.log("Product data:", allProducts);
    // console.log("form", form);

    try {
      let response;

      // ถ้ามี id จะทำการอัปเดตข้อมูลสินค้า
      if (id) {
        response = await actionUpdateProduct(id, {form, image});
        console.log("Update response:", response);
        toast.success("Product updated successfully!");
        navigate("/admin/product");
      }

      if (inputImageRef.current) {
        inputImageRef.current.value = "";
      }
    } catch (err) {
      console.log("Error updating product", err);
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>แก้ไขข้อมูลสินค้า</h1>
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
        {/* <label>Category:</label>
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
        </select> */}

        {/* Upload file */}

        <UploadFileEditProduct
          imageForm={image}
          form={form}
          setForm2={setForm}
          setForm={setImage}
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
              className="boerder"
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

        <button className="bg-blue-500 p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200">แก้ไขสินค้า</button>

        <hr />
        <br />
      </form>
    </div>
  );
};

export default FormEditProduct;
