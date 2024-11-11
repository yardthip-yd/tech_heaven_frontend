import React from "react";
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

function PartBar() {
  return (
    <div className="w-[300px] bg-gray-400 flex flex-col">
      <div>Choose your spec</div>
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
  );
}

export default PartBar;
