import React, { useContext, useEffect, useState } from "react";
import CPUPart from "./part/CPUPart";
import MainboardPart from "./part/MainboardPart";
import VGAPart from "./part/VGAPart";
import RAMPart from "./part/RAMPart";
import HDDPart from "./part/HDDPart";
import SSDPart from "./part/SSDPart";
import PSUPart from "./part/PSUPart";
import PCCasePart from "./part/PCCasePart";
import CPUCoolerPart from "./part/CPUCoolerPart";
import MonitorPart from "./part/MonitorPart";
import { PCBuildContext } from "@/contexts/PCContext";
import useDeepCompareEffect from "use-deep-compare-effect";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";
import useAuthStore from "@/stores/authStore";
import { createPCBuild } from "@/API/product-api";
import { Card } from "@/components/ui/card";
import {
  ShoppingCart,
  Save,
  Trash2,
  ChevronRight,
  Cpu,
  HardDrive,
  Monitor,
  Box,
  Zap,
  Fan
} from "lucide-react";

function PartBar() {
  const [totalPrice, setTotalPrice] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token]);

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
    filterJSON,
    setFilterJSON,
    productList,
    setProductList,
    searchItem,
  } = useContext(PCBuildContext);

  useDeepCompareEffect(() => {
    const cpuPrice = CPU?.price || 0;
    const mainboardPrice = mainboard?.price || 0;
    const vgaPrice = VGA?.price || 0;
    const ramPrice = RAM?.price || 0;
    const ssdPrice = SSD?.price || 0;
    const hddPrice = HDD?.price || 0;
    const psuPrice = PSU?.price || 0;
    const pccasePrice = PCCase?.price || 0;
    const coolerPrice = cooler?.price || 0;
    const monitorPrice = monitor?.price || 0;
    setTotalPrice(
      cpuPrice +
      mainboardPrice +
      vgaPrice +
      ramPrice +
      ssdPrice +
      hddPrice +
      psuPrice +
      pccasePrice +
      coolerPrice +
      monitorPrice
    );
  }, [
    CPU,
    mainboard,
    VGA,
    RAM,
    SSD,
    HDD,
    PSU,
    PCCase,
    cooler,
    monitor,
    filter,
    filterJSON,
  ]);

  const handleAddToCart = () => {
    if (CPU) {
      addToCart({ ...CPU, quantity: 1 });
    }
    if (mainboard) {
      addToCart({ ...mainboard, quantity: 1 });
    }
    if (VGA) {
      addToCart({ ...VGA, quantity: 1 });
    }
    if (RAM) {
      addToCart({ ...RAM, quantity: 1 });
    }
    if (SSD) {
      addToCart({ ...SSD, quantity: 1 });
    }
    if (HDD) {
      addToCart({ ...HDD, quantity: 1 });
    }
    if (PSU) {
      addToCart({ ...PSU, quantity: 1 });
    }
    if (PCCase) {
      addToCart({ ...PCCase, quantity: 1 });
    }
    if (cooler) {
      addToCart({ ...cooler, quantity: 1 });
    }
    if (monitor) {
      addToCart({ ...monitor, quantity: 1 });
    }
    toast.success("Added to cart!");
    setModalOpen(true);
  };

  const handleClearBuild = () => {
    if (CPU) {
      setCPU(null);
    }
    if (mainboard) {
      setMainboard(null);
    }
    if (VGA) {
      setVGA(null);
    }
    if (RAM) {
      setRAM(null);
    }
    if (SSD) {
      setSSD(null);
    }
    if (HDD) {
      setHDD(null);
    }
    if (PSU) {
      setPSU(null);
    }
    if (PCCase) {
      setPCCase(null);
    }
    if (cooler) {
      setCooler(null);
    }
    if (monitor) {
      setMonitor(null);
    }
    setFilter({});
  };

  const createBuild = async () => {
    console.log("saving build...");
    const build = {
      cpu: CPU,
      motherboard: mainboard,
      gpu: VGA,
      memory: RAM,
      ssd: SSD,
      drive: HDD,
      powerSupply: PSU,
      PCCase: PCCase,
      cooler: cooler,
      monitor: monitor,
      totalPrice: totalPrice,
    };
    console.log(build);
    const resp = await createPCBuild(build);
    console.log(resp);
    toast.success("Build saved!");
  };

  const handleSaveBuild = async () => {
    console.log("Creating build...");
    if (!isLogin) {
      toast.error("Please login to save your build!");
      return;
    }
    await createBuild();
  };

  const BuildSummaryItem = ({ product }) => {
    if (!product) return null;
    return (
      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
        <div className="flex items-center gap-3">
          {product.ProductImages?.length > 0 && (
            <img
              className="w-12 h-12 object-cover rounded-md border border-slate-200"
              src={product.ProductImages[0].imageUrl}
              alt={product.name}
            />
          )}
          <span className="font-medium text-slate-700 line-clamp-1">{product.name}</span>
        </div>
        <span className="font-semibold text-slate-900">฿{product.price?.toLocaleString()}</span>
      </div>
    );
  };


  return (
    <Card className="lg:w-[300px] bg-white shadow-xl rounded-xl w-full relative ">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Your Computer Spec</h2>
        <p className="text-slate-400 text-sm">Create your perfect build</p>
      </div>

      <div className="px-4 space-y-4">
        <div className="flex flex-col gap-3">
          <Button
            className="flex-1 h-12 text-white bg-gradient-to-r  from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-colors duration-200"
            onClick={() => setModalOpen(true)}
          >
            <span className="flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Build Summary
            </span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-12 bg-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
            onClick={handleClearBuild}
          >
            <span className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Clear All
            </span>
          </Button>
        </div>

        <div className="relative p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl" />
          <div className="relative">
            <p className="text-sm font-medium text-blue-600 mb-1">Total Cost</p>
            <p className="text-3xl font-bold text-slate-900">
              ฿{totalPrice.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-4 max-h-[500px]">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500 px-1">Core Components</h3>
            <CPUPart />
            <MainboardPart />
            <VGAPart />
            <RAMPart />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500 px-1">Storage</h3>
            <HDDPart />
            <SSDPart />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500 px-1">Other Components</h3>
            <PSUPart />
            <PCCasePart />
            <CPUCoolerPart />
            <MonitorPart />
          </div>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[600px] p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex flex-row items-center gap-2">
              <HardDrive className="w-8 h-8" />
              <span>Build Summary </span>
            </DialogTitle>
            <DialogDescription>
              Review your component selection and total cost
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-6">
            <div classname="overflow-y-auto max-h-[80vh]">
              <BuildSummaryItem product={CPU} icon={Cpu} />
              <BuildSummaryItem product={mainboard} icon={HardDrive} />
              <BuildSummaryItem product={VGA} icon={Monitor} />
              <BuildSummaryItem product={RAM} icon={Box} />
              <BuildSummaryItem product={SSD} icon={HardDrive} />
              <BuildSummaryItem product={HDD} icon={HardDrive} />
              <BuildSummaryItem product={PSU} icon={Zap} />
              <BuildSummaryItem product={PCCase} icon={Box} />
              <BuildSummaryItem product={cooler} icon={Fan} />
              <BuildSummaryItem product={monitor} icon={Monitor} />
            </div>

            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <p className="text-sm font-medium text-blue-600 mb-1">Total Build Cost</p>
              <p className="text-3xl font-bold text-slate-900">
                ฿{totalPrice.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              className="h-12 px-6 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 w-full"
              onClick={handleSaveBuild}
            >
              <span className="flex items-center gap-2">
                <Save size={18} />
                Save Build
              </span>
            </Button>
            <Button
              className="h-12 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-colors duration-200 w-full"
              onClick={handleAddToCart}
            >
              <span className="flex items-center gap-2">
                <ShoppingCart size={18} />
                Add to Cart
              </span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default PartBar;
