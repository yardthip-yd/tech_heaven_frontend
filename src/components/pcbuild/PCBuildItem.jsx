import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { HardDrive } from "lucide-react";

import specDefaultImg from "@/assets/image/specDefaultImg.jpg";

function PCBuildItem(props) {
  const { item } = props;
  console.log(item);
  const CPU = item?.cpu?.product;
  const mainboard = item?.motherboard?.product;
  const VGA = item?.gpu?.product;
  const RAM = item?.memory?.product;
  const SSD = item?.ssd?.product;
  const HDD = item?.drive?.product;
  const PSU = item?.powerSupply?.product;
  const PCCase = item?.case?.product;
  const cooler = item?.cpuCooler?.product;
  const monitor = item?.monitor?.product;
  const totalPrice = item?.totalPrice;
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div
        className="flex flex-col items-center bg-white shadow-md border-[1px] p-2 gap-4 px-4 rounded-md mt-2"
        onClick={() => setModalOpen(true)}
      >
        <img className="w-28 h-28 rounded-md" src={specDefaultImg} alt="" />
        <div className="flex justify-between gap-2 font-semibold text-sm">
          <div>Total Price: </div>
          <div className="text-blue-600">
            ฿{item.totalPrice.toLocaleString()}
          </div>
        </div>
      </div>
      {/* MODAL */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row items-center gap-2">
              <HardDrive className="w-6 h-6" />
              <span>Build Summary</span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-1 max-h-[50vh] overflow-y-auto">
            {/* === CPU === */}
            {CPU && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
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
                <span className="w-12 text-center p-1">
                  ฿{CPU?.price.toLocaleString()}
                </span>
              </div>
            )}

            {/* === Mainboard === */}
            {mainboard && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
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
                <span className="w-12">
                  ฿{mainboard?.price.toLocaleString()}
                </span>
              </div>
            )}

            {/* === VGA === */}
            {VGA && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
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
                <span className="w-12 text-center p-1">
                  ฿{VGA?.price.toLocaleString()}
                </span>
              </div>
            )}

            {/* === RAM === */}
            {RAM && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
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
                <span className="w-12 text-center p-1">
                  ฿{RAM?.price.toLocaleString()}
                </span>
              </div>
            )}

            {/* === SSD === */}
            {SSD && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
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
                <span className="w-12 text-center p-1">
                  ฿{SSD?.price.toLocaleString()}
                </span>
              </div>
            )}

            {/* === HDD === */}
            {HDD && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
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
                <span className="w-12 text-center p-1">
                  ฿{HDD?.price.toLocaleString()}
                </span>
              </div>
            )}

            {/* === PSU === */}
            {PSU && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
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
                <span className="w-12 text-center p-1">
                  ฿{PSU?.price.toLocaleString()}
                </span>
              </div>
            )}

            {/* === Case === */}
            {PCCase && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
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
                <span className="w-12 text-center p-1">
                  ฿{PCCase?.price.toLocaleString()}
                </span>
              </div>
            )}

            {/* === Cooler === */}
            {cooler && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
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
                <span className="w-12 text-center p-1">
                  ฿{cooler?.price.toLocaleString()}
                </span>
              </div>
            )}

            {/* === Monitor === */}
            {monitor && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
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
                <span className="w-12 text-center p-1">
                  ฿{monitor?.price.toLocaleString()}
                </span>
              </div>
            )}
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 flex justify-between items-center">
            <span className="text-sm font-medium mb-1">Total Price:</span>
            <span className="font-bold text-blue-600">
              ฿{totalPrice.toLocaleString()}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PCBuildItem;
