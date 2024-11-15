import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCartStore from "@/stores/cartStore";
import useWishlistStore from "@/stores/wishlistStore";
import useAuthStore from "@/stores/authStore";
import LoginModal from "@/components/auth/LoginModal";

import { PCBuildContext } from "@/contexts/PCContext";

const ProductCardBuild = ({ product }) => {

  const {
    partContent,
    setPartContent,
    CPU,
    setCPU,
    mainboard,
    setMainboard,
    VGA,
    setVGA,
    RAM,
    setRAM,
    SSD,
    setSSD,
    HDD,
    setHDD,
    PSU,
    setPSU,
    PCCase,
    setPCCase,
    cooler,
    setCooler,
    monitor,
    setMonitor,
    filter,
    setFilter,
  } = useContext(PCBuildContext);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const { actionAddToWishlist } = useWishlistStore();
  const { user, getCurrentUser, token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      getCurrentUser();
    }
  }, []);

  const handleAddToCart = () => {
    console.log(product)
    addToCart({ ...product, quantity: 1 });
    toast.success("Added to cart!");
  };

  const handleHeartClick = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      try {
        await actionAddToWishlist(token, product.id);
        toast.success("Added to wishlist!");
      } catch (error) {
        toast.error("Failed to add to wishlist");
      }
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const addToSpec = () => {
    switch (partContent) {
      case 1: // CPU
        setCPU(product);
        setFilter((prev) => {
          prev.cpu = { socket: product.CPU[0].socket };
          return prev;
        });
        break;
      case 2: // Monitor
        setMonitor(product);
        break;
      case 3: // CPU Cooler
        setCooler(product);
        setFilter((prev) => {
          const socket = product.CPUCooler[0].socket.split(",");
          prev.cooler = {
            socket: socket,
          };
          return prev;
        });
        break;
      case 4: // Power Supply
        setPSU(product);
        break;
      case 5: // Case
        setPCCase(product);
        break;
      case 6: // GPU
        setVGA(product);
        break;
      case 7: // Memory
        setRAM(product);
        setFilter((prev) => {
          prev.memory = {
            type: product.Memory[0].type,
          };
          return prev;
        });
        break;
      case 8: // Motherboard
        setMainboard(product);
        setFilter((prev) => {
          const name = product.Motherboard[0].name;
          const regex = /(DDR\d+)/;
          const match = name.match(regex);
          // console.log(match[0]);
          prev.motherboard = {
            socket: product.Motherboard[0].socket,
            type: match[0],
          };
          return prev;
        });
        break;
      case 9: // Drive
        if (filter.drive.type === "SSD") {
          setSSD(product);
        } else if (filter.drive.type === "HDD") {
          setHDD(product);
        }
    }
  };

  const handleAddtoSpec = () => {
    console.log(product);
    addToSpec();
  };

  return (
    <Card className="border-none overflow-hidden rounded-md w-[272px] p-4 shadow-lg">
      <CardHeader className="p-0">
        {product.ProductImages?.[0]?.imageUrl ? (
          <img
            src={product.ProductImages[0].imageUrl}
            alt={product.name}
            className="w-[240px] h-[240px] object-cover rounded-md"
            onClick={handleCardClick}
          />
        ) : (
          <img
            src="https://via.placeholder.com/150"
            alt="No Image Available"
            className="w-[240px] h-[240px] object-cover rounded-md"
            onClick={handleCardClick}
          />
        )}
      </CardHeader>
      <CardContent className="h-26 p-0 mt-2" onClick={handleCardClick}>
        <CardDescription>{product.ProductCategory?.name}</CardDescription>
        <CardTitle className="mt-2 text-lg">
          {truncateText(product.name, 20)}
        </CardTitle>
        <p className="py-1">{truncateText(product.description, 40)}</p>
      </CardContent>
      <div className="flex flex-col">
        <div className="text-lg font-bold p-0 py-4 flex flex-row items-center justify-between">
          <div className="text-lg">THB {product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
          <div className="flex space-x-2">
            <button onClick={handleAddToCart}>
              <ShoppingCart className="w-6 h-6 hover:scale-110 transition-transform hover:text-blue-500" />
            </button>
            <button onClick={handleHeartClick}>
              <Heart className="w-6 h-6 hover:scale-110 transition-transform hover:text-red-500" />
            </button>
          </div>
        </div>

        <button
          className="bg-black text-white w-full p-2 rounded-md hover:bg-slate-800 transition-colors"
          onClick={handleAddtoSpec}
        >
          Add to Build
        </button>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={() => setIsLoginModalOpen(false)}
        />
      )}
    </Card>
  );
};

export default ProductCardBuild;

