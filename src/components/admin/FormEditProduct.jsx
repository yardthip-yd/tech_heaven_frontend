import React, { useEffect, useRef, useState } from "react";
import useAuthStore from "@/stores/authStore";
import useCategoryStore from "@/stores/category";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "@/stores/productStore";
import UploadFileEditProduct from "./UploadfileEditProduct";

const FormEditProduct = ({ closeDialog, productId }) => {
  const navigate = useNavigate();
  const getCategory = useCategoryStore((state) => state.getCategory);
  const categories = useCategoryStore((state) => state.categories);
  const actionReadProducts = useProductStore(
    (state) => state.actionReadProducts
  );
  const actionUpdateProduct = useProductStore(
    (state) => state.actionUpdateProduct
  );
  const actionListProducts = useProductStore(
    (state) => state.actionListProducts
  );

  const [form, setForm] = useState({
    images: [],
  });

  const [image, setImage] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const inputImageRef = useRef(null);

  useEffect(() => {
    getCategory();
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const resp = await actionReadProducts(productId);
      setSelectedCategory(String(resp.categoryId));

      const formattedImages = resp.ProductImages.map((img) => ({
        public_id: img.public_id,
        secure_url: img.imageUrl,
      }));

      setImage(formattedImages);

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
      setSelectedCategory(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !selectedCategory ||
      !form.stock
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      if (productId) {
        await actionUpdateProduct(productId, { form, image });
        toast.success("Product updated successfully!");
        navigate("/admin/product");
      }

      if (inputImageRef.current) {
        inputImageRef.current.value = "";
      }
      await actionListProducts(100);
    } catch (err) {
      console.log("Error updating product", err);
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Product Name:
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={form.name || ""}
                  onChange={handleOnChange}
                  placeholder="Enter product name"
                  name="name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Price:
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={form.price || ""}
                  onChange={handleOnChange}
                  placeholder="Enter price"
                  name="price"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Stock Quantity:
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={form.stock || ""}
                  onChange={handleOnChange}
                  placeholder="Enter stock quantity"
                  name="stock"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  Description:
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={form.description || ""}
                  onChange={handleOnChange}
                  placeholder="Enter product description"
                  name="description"
                  rows="3"
                />
              </div>
            </div>

            <div>
              <UploadFileEditProduct
                imageForm={image}
                form={form}
                setForm2={setForm}
                setForm={setImage}
                inputImageRef={inputImageRef}
              />
            </div>

            {/* ===== CPU ===== */}
            {selectedCategory === "1" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
                <h2 className="text-lg font-medium text-slate-800 col-span-2">
                  CPU Information
                </h2>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Model:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.model || ""}
                    onChange={handleOnChange}
                    placeholder="Enter model"
                    name="model"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Socket:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.socket || ""}
                    onChange={handleOnChange}
                    placeholder="Enter socket"
                    name="socket"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Core:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.cores || ""}
                    onChange={handleOnChange}
                    placeholder="Enter core"
                    name="cores"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Thread:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.threads || ""}
                    onChange={handleOnChange}
                    placeholder="Enter thread"
                    name="threads"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Base Clock (GHz):
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.baseClock || ""}
                    onChange={handleOnChange}
                    placeholder="Enter base clock"
                    name="baseClock"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Boost Clock (GHz):
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.boostClock || ""}
                    onChange={handleOnChange}
                    placeholder="Enter boost clock"
                    name="boostClock"
                  />
                </div>

                {/* Similar styling for other CPU fields */}
              </div>
            )}

            {/* ===== Mainbaord ===== */}
            {selectedCategory === "8" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
                <h2 className="text-lg font-medium text-slate-800 col-span-2">
                  Mainbaord Information
                </h2>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Model:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.model || ""}
                    onChange={handleOnChange}
                    placeholder="Enter model"
                    name="model"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Socket:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.socket || ""}
                    onChange={handleOnChange}
                    placeholder="Enter socket"
                    name="socket"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Chipset:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.chipset || ""}
                    onChange={handleOnChange}
                    placeholder="Enter chipset"
                    name="chipset"
                  />
                </div>
              </div>
            )}

            {/* ===== VGA ===== */}
            {selectedCategory === "6" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
                <h2 className="text-lg font-medium text-slate-800 col-span-2">
                  Graphic Card Information
                </h2>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Model:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.model || ""}
                    onChange={handleOnChange}
                    placeholder="Enter model"
                    name="model"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    VRAM (GB):
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.vram || ""}
                    onChange={handleOnChange}
                    placeholder="Enter VRAM"
                    name="vram"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Power Consumption (Watt):
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.power || ""}
                    onChange={handleOnChange}
                    placeholder="Enter power consumption"
                    name="power"
                  />
                </div>
              </div>
            )}

            {/* ===== RAM ===== */}
            {selectedCategory === "7" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
                <h2 className="text-lg font-medium text-slate-800 col-span-2">
                  RAM Information
                </h2>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Model:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.model || ""}
                    onChange={handleOnChange}
                    placeholder="Enter model"
                    name="model"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Memory Size (GB):
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.memory || ""}
                    onChange={handleOnChange}
                    placeholder="Enter memory size"
                    name="memory"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Memory Type:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.type || ""}
                    onChange={handleOnChange}
                    placeholder="Enter memory type"
                    name="type"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    BUS (MHz):
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.busSpeed || ""}
                    onChange={handleOnChange}
                    placeholder="Enter BUS"
                    name="busSpeed"
                  />
                </div>
              </div>
            )}

            {/* ===== Drive ===== */}
            {selectedCategory === "9" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
                <h2 className="text-lg font-medium text-slate-800 col-span-2">
                  Storage Drive Information
                </h2>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Model:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.model || ""}
                    onChange={handleOnChange}
                    placeholder="Enter model"
                    name="model"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Type:
                  </label>
                  <div className="flex items-center space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="HDD"
                        checked={form.type === "HDD"}
                        onChange={handleOnChange}
                      />{" "}
                      HDD
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="SSD"
                        checked={form.type === "SSD"}
                        onChange={handleOnChange}
                      />{" "}
                      SSD
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Format Type:
                  </label>
                  <div className="flex items-center space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="format"
                        value="SATA"
                        checked={form.format === "SATA"}
                        onChange={handleOnChange}
                      />{" "}
                      SATA
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="format"
                        value="M_2"
                        checked={form.format === "M_2"}
                        onChange={handleOnChange}
                      />{" "}
                      M.2
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Capacity:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.size || ""}
                    onChange={handleOnChange}
                    placeholder="Enter capacity"
                    name="size"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Speed:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.speed || ""}
                    onChange={handleOnChange}
                    placeholder="Enter Speed"
                    name="speed"
                  />
                </div>
              </div>
            )}

            {/* ===== POWER SUPPLY ===== */}
            {selectedCategory === "4" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
                <h2 className="text-lg font-medium text-slate-800 col-span-2">
                  Power Supply Information
                </h2>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Model:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.model || ""}
                    onChange={handleOnChange}
                    placeholder="Enter model"
                    name="model"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Wattage (Watt):
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.wattage || ""}
                    onChange={handleOnChange}
                    placeholder="Enter wattage"
                    name="wattage"
                  />
                </div>
              </div>
            )}

            {/* ===== Case ===== */}
            {selectedCategory === "5" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
                <h2 className="text-lg font-medium text-slate-800 col-span-2">
                  Case Information
                </h2>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Model:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.model || ""}
                    onChange={handleOnChange}
                    placeholder="Enter model"
                    name="model"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Size:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.size || ""}
                    onChange={handleOnChange}
                    placeholder="Enter size"
                    name="size"
                  />
                </div>
              </div>
            )}

            {/* ===== CPU Cooler ===== */}
            {selectedCategory === "3" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
                <h2 className="text-lg font-medium text-slate-800 col-span-2">
                  CPU Cooler Information
                </h2>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Model:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.model || ""}
                    onChange={handleOnChange}
                    placeholder="Enter model"
                    name="model"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Socket Support:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.socket || ""}
                    onChange={handleOnChange}
                    placeholder="Enter Socket Support"
                    name="socket"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Radiator Size (mm):
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.radiator || ""}
                    onChange={handleOnChange}
                    placeholder="Enter radiator size"
                    name="radiator"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Type:
                  </label>
                  <div className="flex items-center space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="AIR"
                        checked={form.type === "AIR"}
                        onChange={handleOnChange}
                      />{" "}
                      AIR
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="LIQUID"
                        checked={form.type === "LIQUID"}
                        onChange={handleOnChange}
                      />{" "}
                      LIQUID
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ===== Case ===== */}
            {selectedCategory === "2" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
                <h2 className="text-lg font-medium text-slate-800 col-span-2">
                  Monitor Information
                </h2>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Model:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.model || ""}
                    onChange={handleOnChange}
                    placeholder="Enter model"
                    name="model"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Screen Size (''):
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.size || ""}
                    onChange={handleOnChange}
                    placeholder="Enter size"
                    name="size"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Resolution:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.resolution || ""}
                    onChange={handleOnChange}
                    placeholder="Enter resolution"
                    name="resolution"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Refresh Rate (Hz):
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.refreshRate || ""}
                    onChange={handleOnChange}
                    placeholder="Enter refresh rate"
                    name="refreshRate"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Panel Type:
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={form.panelType || ""}
                    onChange={handleOnChange}
                    placeholder="Enter panel type"
                    name="panelType"
                  />
                </div>
              </div>
            )}

            {/* ===== End of Part section ===== */}

            {/* Additional conditional rendering blocks for other categories */}

            <div className="flex flex-col gap-4 mt-6">
              <button
                type="submit"
                className="w-full px-4 py-3 text-white rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={closeDialog}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-black transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;
