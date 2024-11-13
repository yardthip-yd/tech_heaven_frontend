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

  return (
    <>
      <div className="w-[300px] bg-gray-400 flex flex-col">
        <div>Choose your spec</div>
        <button className="p-2 bg-green-500" onClick={() => setModalOpen(true)}>
          Summary
        </button>
        <button className="p-2 bg-red-500" onClick={() => handleClearBuild()}>
          Clear
        </button>
        <div className="flex justify-between">
          <div>Total Price:</div>
          <div>{totalPrice}</div>
        </div>
        <div className="flex flex-col">
          <CPUPart />
          <MainboardPart />
          <VGAPart />
          <RAMPart />
          <HDDPart />
          <SSDPart />
          <PSUPart />
          <PCCasePart />
          <CPUCoolerPart />
          <MonitorPart />
        </div>
      </div>
      {/* MODAL */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Build Summary</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {/* === CPU === */}
            {CPU && (
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  {CPU.ProductImages.length > 0 && (
                    <img
                      className="w-10 h-10"
                      src={CPU.ProductImages[0].imageUrl}
                      alt=""
                    />
                  )}
                  {CPU.name}
                </span>
                <span>฿{CPU?.price}</span>
              </div>
            )}

            {/* === Mainboard === */}
            {mainboard && (
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  {mainboard.ProductImages.length > 0 && (
                    <img
                      className="w-10 h-10"
                      src={mainboard.ProductImages[0].imageUrl}
                      alt=""
                    />
                  )}
                  {mainboard.name}
                </span>
                <span>฿{mainboard?.price}</span>
              </div>
            )}

            {/* === VGA === */}
            {VGA && (
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  {VGA.ProductImages.length > 0 && (
                    <img
                      className="w-10 h-10"
                      src={VGA.ProductImages[0].imageUrl}
                      alt=""
                    />
                  )}
                  {VGA.name}
                </span>
                <span>฿{VGA?.price}</span>
              </div>
            )}

            {/* === RAM === */}
            {RAM && (
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  {RAM.ProductImages.length > 0 && (
                    <img
                      className="w-10 h-10"
                      src={RAM.ProductImages[0].imageUrl}
                      alt=""
                    />
                  )}
                  {RAM.name}
                </span>
                <span>฿{RAM?.price}</span>
              </div>
            )}

            {/* === SSD === */}
            {SSD && (
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  {SSD.ProductImages.length > 0 && (
                    <img
                      className="w-10 h-10"
                      src={SSD.ProductImages[0].imageUrl}
                      alt=""
                    />
                  )}
                  {SSD.name}
                </span>
                <span>฿{SSD?.price}</span>
              </div>
            )}

            {/* === HDD === */}
            {HDD && (
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  {HDD.ProductImages.length > 0 && (
                    <img
                      className="w-10 h-10"
                      src={HDD.ProductImages[0].imageUrl}
                      alt=""
                    />
                  )}
                  {HDD.name}
                </span>
                <span>฿{HDD?.price}</span>
              </div>
            )}

            {/* === PSU === */}
            {PSU && (
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  {PSU.ProductImages.length > 0 && (
                    <img
                      className="w-10 h-10"
                      src={PSU.ProductImages[0].imageUrl}
                      alt=""
                    />
                  )}
                  {PSU.name}
                </span>
                <span>฿{PSU?.price}</span>
              </div>
            )}

            {/* === Case === */}
            {PCCase && (
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  {PCCase.ProductImages.length > 0 && (
                    <img
                      className="w-10 h-10"
                      src={PCCase.ProductImages[0].imageUrl}
                      alt=""
                    />
                  )}
                  {PCCase.name}
                </span>
                <span>฿{PCCase?.price}</span>
              </div>
            )}

            {/* === Cooler === */}
            {cooler && (
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  {cooler.ProductImages.length > 0 && (
                    <img
                      className="w-10 h-10"
                      src={cooler.ProductImages[0].imageUrl}
                      alt=""
                    />
                  )}
                  {cooler.name}
                </span>
                <span>฿{cooler?.price}</span>
              </div>
            )}

            {/* === Monitor === */}
            {monitor && (
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  {monitor.ProductImages.length > 0 && (
                    <img
                      className="w-10 h-10"
                      src={monitor.ProductImages[0].imageUrl}
                      alt=""
                    />
                  )}
                  {monitor.name}
                </span>
                <span>฿{monitor?.price}</span>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <span>Total Price:</span>
              <span>฿{totalPrice}</span>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
            <Button onClick={handleSaveBuild}>Save Build</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PartBar;
