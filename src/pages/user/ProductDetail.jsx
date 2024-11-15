import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductStore from "@/stores/productStore";
import useCartStore from "@/stores/cartStore";
import useWishlistStore from "@/stores/wishlistStore";
import useAuthStore from "@/stores/authStore";
import { Heart, ChevronLeft, Truck, Shield } from "lucide-react";
import { toast } from "react-toastify";
import LoginModal from "@/components/auth/LoginModal";
import ReletedProducts from "@/components/product/ReletedProducts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getProductByCategory, readProducts } from "@/API/product-api";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, actionGetAllProducts } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const { actionAddToWishlist } = useWishlistStore();
  const { user, token } = useAuthStore();
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (products.length === 0) {
  //       actionGetAllProducts();
  //     }
  //   }, [products, actionGetAllProducts]);

  const getProductDetail = async () => {
    const resp = await readProducts(id);
    // console.log(resp.data);
    setProductData(resp.data);
    setProductCategory(resp.data.categoryId);
    setSelectedImage(resp.data.ProductImages[0]?.imageUrl || "");
    getProductSameCategory(resp.data.categoryId, resp.data);
  };

  const getProductSameCategory = async (id, productInfo) => {
    const resp =
      id == 10
        ? await getProductByCategory(id, {
            accessoriesType: productInfo.Accessory[0].accessoriesType,
          })
        : await getProductByCategory(id);
    console.log(resp.data);
    const filteredRelatedProducts = resp.data.products.filter(
      (item) => item.id !== productInfo.id
    );
    setRelatedProducts(filteredRelatedProducts);
  };

  useEffect(() => {
    getProductDetail();
  }, [products, id]);

  if (!productData) return null;

  //   const relatedProducts = products.filter(
  //     (item) =>
  //       item.categoryId === productData.categoryId && item.id !== productData.id
  //   );

  const handleAddToCart = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      addToCart({ ...productData, quantity });
      toast.success("Added to cart!");
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      try {
        await actionAddToWishlist(token, productData.id);
        toast.success("Added to wishlist!");
      } catch (error) {
        toast.error("Failed to add to wishlist");
      }
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      const cartItems = useCartStore.getState().cartItems; // ดึงข้อมูล cartItems จาก state
      if (cartItems.length === 0) {
        // ถ้า cart ว่าง ให้เพิ่มสินค้าใหม่เข้าไป
        addToCart({ ...productData, quantity });
      } else {
        // ถ้า cart มีสินค้าแล้ว ให้เพิ่มสินค้าใหม่เข้าไป
        addToCart({ ...productData, quantity });
      }
      navigate("/user/payment");
    }
  };

  //   console.log(productData);

  return (
    <div className="px-8 py-12 min-w-[800px] max-w-7xl mx-auto">
      <Button
        variant="ghost"
        className="mb-8 group"
        onClick={() => navigate("/store")}
      >
        <ChevronLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Store
      </Button>

      {/* Container for Product Images and Info */}
      <div className="flex gap-8">
        {/* Left Side - Product Images */}
        <div className="w-1/2">
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="flex-1">
              <img
                src={selectedImage}
                alt={productData.name}
                className="w-full max-h-[600px] object-cover rounded-lg"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex flex-row gap-4 overflow-y-auto">
              {productData.ProductImages.map((image, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover cursor-pointer rounded-lg"
                  onClick={() => setSelectedImage(image.imageUrl)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="w-1/2 space-y-6">
          <div>
            <Badge className="mb-4" variant="secondary">
              {productData.category?.name || "General"}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight">
              {productData.name}
            </h1>
            <p className="mt-4 text-slate-600 leading-relaxed">
              {productData.description}
            </p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold">
              THB {productData.price.toLocaleString()}
            </span>
            {productData.oldPrice && (
              <span className="text-lg text-slate-500 line-through">
                THB {productData.oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <button
                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-slate-100"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <span className="w-16 text-center font-medium text-lg">
                {quantity}
              </span>
              <button
                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-slate-100"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <span className="text-sm text-slate-500">
              {productData.stock} pieces available
            </span>
          </div>

          <div className="flex gap-4">
            <Button
              className="flex-1 h-14 text-lg transition-all hover:scale-105"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              className="flex-1 h-14 text-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white transition-all hover:scale-105"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

          <Button
            variant="ghost"
            className="w-full flex items-center gap-2 group"
            onClick={handleAddToWishlist}
          >
            <Heart className="w-5 h-5 transition-all group-hover:text-red-500 group-hover:fill-red-500" />
            Add to Wishlist
          </Button>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 cursor-help">
                  <Truck className="w-6 h-6 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-sm text-slate-500">
                      For orders over THB 1,000
                    </p>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                Orders over THB 1,000 qualify for free standard shipping.
                Delivery typically takes 3-5 business days.
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 cursor-help">
                  <Shield className="w-6 h-6 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium">Warranty</p>
                    <p className="text-sm text-slate-500">12 months coverage</p>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                All products come with a 12-month warranty covering
                manufacturing defects and malfunctions.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>

      {/* Product Details Section */}

      {/* ===== CPU ===== */}
      {productCategory === 1 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
          <h2 className="text-lg font-medium text-slate-800 col-span-2">
            CPU Information
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Model:
            </label>
            <p>{productData.CPU[0].model || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Socket:
            </label>
            <p>{productData.CPU[0].socket || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Core:
            </label>
            <p>{productData.CPU[0].cores || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Thread:
            </label>
            <p>{productData.CPU[0].threads || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Base Clock (GHz):
            </label>
            <p>{productData.CPU[0].baseClock || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Boost Clock (GHz):
            </label>
            <p>{productData.CPU[0].boostClock || ""}</p>
          </div>

          {/* Similar styling for other CPU fields */}
        </div>
      )}

      {/* ===== Mainbaord ===== */}
      {productCategory === 8 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
          <h2 className="text-lg font-medium text-slate-800 col-span-2">
            Mainbaord Information
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Model:
            </label>
            <p>{productData.Motherboard[0].model}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Socket:
            </label>
            <p>{productData.Motherboard[0].socket || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Chipset:
            </label>
            <p>{productData.Motherboard[0].chipset || ""}</p>
          </div>
        </div>
      )}

      {/* ===== VGA ===== */}
      {productCategory === 6 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
          <h2 className="text-lg font-medium text-slate-800 col-span-2">
            Graphic Card Information
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Model:
            </label>
            <p>{productData.GPU[0].model || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              VRAM (GB):
            </label>
            <p>{productData.GPU[0].vram || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Power Consumption (Watt):
            </label>
            <p>{productData.GPU[0].power || ""}</p>
          </div>
        </div>
      )}

      {/* ===== RAM ===== */}
      {productCategory === 7 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
          <h2 className="text-lg font-medium text-slate-800 col-span-2">
            RAM Information
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Model:
            </label>
            <p>{productData.Memory[0].model || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Memory Size (GB):
            </label>
            <p>{productData.Memory[0].memory || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Memory Type:
            </label>
            <p>{productData.Memory[0].type || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              BUS (MHz):
            </label>
            <p>{productData.Memory[0].busSpeed || ""}</p>
          </div>
        </div>
      )}

      {/* ===== Drive ===== */}
      {productCategory === 9 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
          <h2 className="text-lg font-medium text-slate-800 col-span-2">
            Storage Drive Information
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Model:
            </label>
            <p>{productData.Drive[0].model || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Type:
            </label>
            <p>{productData.Drive[0].type || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Format Type:
            </label>
            <p>
              {(productData.Drive[0].format === "M_2"
                ? "M.2"
                : productData.Drive[0].format) || ""}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Capacity:
            </label>
            <p>{productData.Drive[0].size || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              {productData.Drive[0].type === "HDD" ? "Speed" : "Read/Write"}:
            </label>
            <p>{productData.Drive[0].speed || ""}</p>
          </div>
        </div>
      )}

      {/* ===== POWER SUPPLY ===== */}
      {productCategory === 4 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
          <h2 className="text-lg font-medium text-slate-800 col-span-2">
            Power Supply Information
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Model:
            </label>
            <p>{productData.PowerSupply[0].model || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Wattage (Watt):
            </label>
            <p>{productData.PowerSupply[0].wattage || ""}</p>
          </div>
        </div>
      )}

      {/* ===== Case ===== */}
      {productCategory === 5 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
          <h2 className="text-lg font-medium text-slate-800 col-span-2">
            Case Information
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Model:
            </label>
            <p>{productData.Case[0].model || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Size:
            </label>
            <p>{productData.Case[0].size || ""}</p>
          </div>
        </div>
      )}

      {/* ===== CPU Cooler ===== */}
      {productCategory === 3 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
          <h2 className="text-lg font-medium text-slate-800 col-span-2">
            CPU Cooler Information
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Model:
            </label>
            <p>{productData.CPUCooler[0].model || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Socket Support:
            </label>
            <p>{productData.CPUCooler[0].socket || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Radiator Size (mm):
            </label>
            <p>{productData.CPUCooler[0].radiator || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Type:
            </label>
            <p>{productData.CPUCooler[0].model || ""}</p>
          </div>
        </div>
      )}

      {/* ===== Monitor ===== */}
      {productCategory === 2 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
          <h2 className="text-lg font-medium text-slate-800 col-span-2">
            Monitor Information
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Model:
            </label>
            <p>{productData.Monitor[0].model || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Screen Size (''):
            </label>
            <p>{productData.Monitor[0].size || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Resolution:
            </label>
            <p>{productData.Monitor[0].resolution || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Refresh Rate (Hz):
            </label>
            <p>{productData.Monitor[0].refreshRate || ""}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Panel Type:
            </label>
            <p>{productData.Monitor[0].panelType || ""}</p>
          </div>
        </div>
      )}

      {/* ===== End of Part section ===== */}

      {/* Related Products Section */}
      <div className="mt-16">
        <ReletedProducts relatedProducts={relatedProducts} />
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;
