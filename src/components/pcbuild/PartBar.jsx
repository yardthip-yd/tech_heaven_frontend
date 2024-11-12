import React, { useContext, useState } from "react";
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
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";

function PartBar() {
  const [totalPrice, setTotalPrice] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <>
      <div className="w-[300px] bg-gray-400 flex flex-col">
        <div>Choose your spec</div>
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
        <button className="p-2 bg-green-500" onClick={() => setModalOpen(true)}>
          Summary
        </button>
      </div>
      {/* MODAL */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Build Summary</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-bold">
              <span>Total Price:</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>CPU: {CPU?.name}</span>
              <span>${CPU?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Mainboard: {mainboard?.name}</span>
              <span>${mainboard?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Graphics Card: {VGA?.name}</span>
              <span>${VGA?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>RAM: {RAM?.name}</span>
              <span>${RAM?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>SSD: {SSD?.name}</span>
              <span>${SSD?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>HDD: {HDD?.name}</span>
              <span>${HDD?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Power Supply: {PSU?.name}</span>
              <span>${PSU?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Case: {PCCase?.name}</span>
              <span>${PCCase?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>CPU Cooler: {cooler?.name}</span>
              <span>${cooler?.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Monitor: {monitor?.name}</span>
              <span>${monitor?.price}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>{" "}
    </>
  );
}

export default PartBar;
