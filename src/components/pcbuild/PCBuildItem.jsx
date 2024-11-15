import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        className="flex flex-col items-center bg-slate-300 p-2 rounded-md"
        onClick={() => setModalOpen(true)}
      >
        <div className="bg-slate-200 w-24 h-24">SAMPLE IMAGE</div>
        <div className="flex justify-between">
          <div>Total Price:</div>
          <div>฿{item.totalPrice}</div>
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
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PCBuildItem;
