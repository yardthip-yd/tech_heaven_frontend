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
import { Pencil, Trash, Search, Cpu } from "lucide-react";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import FormEditProduct from "./FormEditProduct"; // Import FormEditProduct

const FormProduct = () => {
  const getCategory = useCategoryStore((state) => state.getCategory);
  const categories = useCategoryStore((state) => state.categories);
  const actionListProducts = useProductStore(
    (state) => state.actionListProducts
  );
  const products = useProductStore((state) => state.products);
  const actionDeleteProduct = useProductStore(
    (state) => state.actionDeleteProduct
  );

  const [form, setForm] = useState({ images: [] });
  const [image, setImage] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const inputImageRef = useRef(null);

  useEffect(() => {
    getCategory();
    actionListProducts(999);
  }, []);

  const handleOnChange = (e) => {
    // setForm({
    //   ...form,
    //   [e.target.name]: e.target.value,
    // });
    if (e.target.name === "categoryId") {
      setSelectedCategory(e.target.value);
      setForm((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    } else {
      setForm((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
          accessoriesType: "MOUSE",
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const allProducts = {
      image: image,
      form: form,
      selectedCategory: selectedCategory,
    };

    console.log(allProducts);
    try {
      let response;
      switch (selectedCategory) {
        case "1":
          response = await createProductCPU(allProducts);
          break;
        case "2":
          response = await createProductMonitor(allProducts);
          break;
        case "3":
          response = await createProductCPUCooler(allProducts);
          break;
        case "4":
          response = await createProductPowerSupply(allProducts);
          break;
        case "5":
          response = await createProductCase(allProducts);
          break;
        case "6":
          response = await createProductGPU(allProducts);
          break;
        case "7":
          response = await createProductMemory(allProducts);
          break;
        case "8":
          response = await createProductMotherboard(allProducts);
          break;
        case "9":
          response = await createProductDrive(allProducts);
          break;
        case "10":
          response = await createProductAccessory(allProducts);
          break;
        default:
          throw new Error("Invalid category selected");
      }

      toast.success("Product created successfully!");
      setForm({});
      setSelectedCategory(0);
      setImage([]);
      if (inputImageRef.current) {
        inputImageRef.current.value = "";
      }
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
        toast.success("Deleted Successfully!");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openDialog = (id) => {
    setSelectedProductId(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProductId(null);
  };

  const filteredProducts = products.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoryId.toString() === searchTerm
  );
  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-8 h-8 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  console.log(form);

  return (
    <>
      <div className="flex flex-row gap-8 mx-auto p-6">
        <Card className="w-full lg:w-1/4 h-[650px] overflow-y-auto">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <Cpu className="h-6 w-6 text-blue-500" />
              <CardTitle className="text-2xl font-bold text-slate-800">
                Product Information
              </CardTitle>
            </div>
            <CardDescription>
              Fill out the details to add a new product.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  label="Name"
                  value={form.name}
                  onChange={handleOnChange}
                  name="name"
                  placeholder="Product Name"
                />
                <InputField
                  label="Description"
                  value={form.description}
                  onChange={handleOnChange}
                  name="description"
                  placeholder="Product Description"
                />
                <InputField
                  label="Price"
                  type="number"
                  value={form.price}
                  onChange={handleOnChange}
                  name="price"
                  placeholder="Product Price"
                />
                <InputField
                  label="Stock"
                  type="number"
                  value={form.stock}
                  onChange={handleOnChange}
                  name="stock"
                  placeholder="Product Stock"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-slate-700 mb-1">
                  Category:
                </label>
                <select
                  value={selectedCategory}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  name="categoryId"
                  onChange={handleOnChange}
                  required
                >
                  <option value={0} disabled>
                    Please Select Category
                  </option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <Uploadfile
                  form={form}
                  setForm={setImage}
                  setForm2={setForm}
                  inputImageRef={inputImageRef}
                  className="mb-4"
                />
              </div>

              {/* selectedCategory หายไป */}

              {/*CPU Product*/}
              {selectedCategory === "1" && (
                <div>
                  <InputField
                    label="Model"
                    value={form.model}
                    onChange={handleOnChange}
                    name="model"
                    placeholder="product model"
                  />
                  <InputField
                    label="Socket"
                    value={form.socket}
                    onChange={handleOnChange}
                    name="socket"
                    placeholder="product socket"
                  />
                  <InputField
                    label="Cores"
                    value={form.cores}
                    onChange={handleOnChange}
                    name="cores"
                    placeholder="product cores"
                  />
                  <InputField
                    label="Threads"
                    value={form.threads}
                    onChange={handleOnChange}
                    name="threads"
                    placeholder="product threads"
                  />
                  <InputField
                    label="BaseClock(GHz)"
                    value={form.baseClock}
                    onChange={handleOnChange}
                    name="baseClock"
                    placeholder="product baseClock"
                  />
                  <InputField
                    label="boostClock(GHz)"
                    value={form.boostClock}
                    onChange={handleOnChange}
                    name="boostClock"
                    placeholder="product boostClock"
                  />
                </div>
              )}

              {/*Monitor Product*/}
              {selectedCategory === "2" && (
                <div>
                  <InputField
                    label="Model"
                    value={form.model}
                    onChange={handleOnChange}
                    name="model"
                    placeholder="product model"
                  />
                  <InputField
                    label="Size"
                    value={form.size}
                    onChange={handleOnChange}
                    name="size"
                    placeholder="product size"
                  />
                  <InputField
                    label="Resolution"
                    value={form.resolution}
                    onChange={handleOnChange}
                    name="resolution"
                    placeholder="product resolution"
                  />
                  <InputField
                    label="RefreshRate(Hz)"
                    value={form.refreshRate}
                    onChange={handleOnChange}
                    name="refreshRate"
                    placeholder="product refreshRate"
                  />
                  <InputField
                    label="PanelType"
                    value={form.panelType}
                    onChange={handleOnChange}
                    name="panelType"
                    placeholder="product panelType"
                  />
                </div>
              )}

              {/*CPUCooler Product*/}
              {selectedCategory === "3" && (
                <div>
                  <InputField
                    label="Model"
                    value={form.model}
                    onChange={handleOnChange}
                    name="model"
                    placeholder="product model"
                  />
                  <InputField
                    label="Socket"
                    value={form.socket}
                    onChange={handleOnChange}
                    name="socket"
                    placeholder="product socket"
                  />
                  <InputField
                    label="Radiator"
                    value={form.radiator}
                    onChange={handleOnChange}
                    name="radiator"
                    placeholder="product radiator"
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
                  <InputField
                    label="Model"
                    value={form.model}
                    onChange={handleOnChange}
                    name="model"
                    placeholder="product model"
                  />
                  <InputField
                    label="Wattage(W)"
                    value={form.wattage}
                    onChange={handleOnChange}
                    name="wattage"
                    placeholder="product wattage"
                  />
                </div>
              )}

              {/*Case Product*/}
              {selectedCategory === "5" && (
                <div>
                  <InputField
                    label="Model"
                    value={form.model}
                    onChange={handleOnChange}
                    name="model"
                    placeholder="product model"
                  />
                  <InputField
                    label="Size"
                    value={form.size}
                    onChange={handleOnChange}
                    name="size"
                    placeholder="product size"
                  />
                </div>
              )}

              {/*GPU Product*/}
              {selectedCategory === "6" && (
                <div>
                  <InputField
                    label="Model"
                    value={form.model}
                    onChange={handleOnChange}
                    name="model"
                    placeholder="product model"
                  />
                  <InputField
                    label="Vram(GB)"
                    value={form.vram}
                    onChange={handleOnChange}
                    name="vram"
                    placeholder="product vram"
                  />
                  <InputField
                    label="Power(W)"
                    value={form.power}
                    onChange={handleOnChange}
                    name="power"
                    placeholder="product power"
                  />
                </div>
              )}

              {/*Memory Product*/}
              {selectedCategory === "7" && (
                <div>
                  <InputField
                    label="Model"
                    value={form.model}
                    onChange={handleOnChange}
                    name="model"
                    placeholder="product model"
                  />
                  <InputField
                    label="Memory(GB)"
                    value={form.memory}
                    onChange={handleOnChange}
                    name="memory"
                    placeholder="product memory"
                  />
                  <InputField
                    label="BusSpeed(MB/s)"
                    value={form.busSpeed}
                    onChange={handleOnChange}
                    name="busSpeed"
                    placeholder="product busSpeed"
                  />
                  <InputField
                    label="Type"
                    value={form.type}
                    onChange={handleOnChange}
                    name="type"
                    placeholder="product type"
                  />
                </div>
              )}

              {/*Motherboard Product*/}
              {selectedCategory === "8" && (
                <div>
                  <InputField
                    label="Model"
                    value={form.model}
                    onChange={handleOnChange}
                    name="model"
                    placeholder="product model"
                  />
                  <InputField
                    label="Socket"
                    value={form.socket}
                    onChange={handleOnChange}
                    name="socket"
                    placeholder="product socket"
                  />
                  <InputField
                    label="Chipset"
                    value={form.chipset}
                    onChange={handleOnChange}
                    name="chipset"
                    placeholder="product chipset"
                  />
                </div>
              )}

              {/*Drive Product*/}
              {selectedCategory === "9" && (
                <div>
                  <InputField
                    label="Model"
                    value={form.model}
                    onChange={handleOnChange}
                    name="model"
                    placeholder="product model"
                  />
                  <InputField
                    label="Size"
                    value={form.size}
                    onChange={handleOnChange}
                    name="size"
                    placeholder="product size"
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
                  <InputField
                    label="Speed"
                    value={form.speed}
                    onChange={handleOnChange}
                    name="speed"
                    placeholder="product speed"
                  />
                </div>
              )}

              {/*Accessory Product*/}
              {selectedCategory === "10" && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-slate-700 mb-1">
                    Accessories Type:
                  </label>
                  <select
                    value={form.accessoriesType}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    name="accessoriesType"
                    onChange={handleOnChange}
                    required
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

              <Button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 p-4 rounded-lg shadow-md transition duration-200 font-medium"
              >
                Add Product
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="w-full lg:w-3/4 h-[92vh] relative">
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-slate-800">
              Product Lists
            </CardTitle>
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-y-auto relative h-[84vh]">
              <Table className="w-full">
                <TableHeader className="h-14 bg-slate-100">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700 text-base text-center">
                      #
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-base text-center">
                      Image
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-base text-center">
                      Name
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-base text-center">
                      Description
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-base text-center">
                      Price
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-base text-center">
                      Stock
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-base text-center">
                      Category
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-base text-center">
                      Updated
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-base text-center">
                      Edit/Delete
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="py-2 relative">
                  {filteredProducts.map((item, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-slate-50 transition-colors duration-150"
                    >
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="text-center">
                        {item.ProductImages?.length ? (
                          <img
                            src={item.ProductImages[0].imageUrl}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-slate-100 flex items-center justify-center text-slate-400">
                            No Image
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center whitespace-pre-wrap">
                        {item.name.length > 20
                          ? item.name.slice(0, 20) + "\n" + item.name.slice(20)
                          : item.name}
                      </TableCell>
                      <TableCell className="text-center whitespace-pre-wrap">
                        {item.description.length > 20
                          ? item.description.slice(0, 20) +
                            "\n" +
                            item.description.slice(20)
                          : item.description}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.price.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.stock}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.categoryId}
                      </TableCell>
                      <TableCell className="text-center">
                        {moment(item.updatedAt).format("LLL")}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            onClick={() => openDialog(item.id)}
                            className="p-2 border rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                          >
                            <Pencil className="w-4 h-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleDelete(item.id)}
                            className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                          >
                            <Trash className="w-5 h-5 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Product Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-slate-800">
                Edit Product Information
              </DialogTitle>
              <DialogClose onClick={closeDialog} />
            </DialogHeader>
            <FormEditProduct
              productId={selectedProductId}
              closeDialog={closeDialog}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

const InputField = ({
  label,
  type = "text",
  value,
  name,
  placeholder,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label}:
    </label>
    <input
      type={type}
      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    />
  </div>
);

export default FormProduct;
