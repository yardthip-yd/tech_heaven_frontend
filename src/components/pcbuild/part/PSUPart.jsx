import { IconPSU } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";

function PSUPart() {
  const { setPartContent, PSU, setPSU, setFilter } = useContext(PCBuildContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setPartContent(4);
    setSearchItem("");
  };

  const handleRemovePSU = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPSU(null);
    // console.log(filterJSON);
  };

  return (
    <div
      className="flex text-lg font-bold items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-9 h-9 flex items-center justify-center">
        <IconPSU />
      </div>
      {PSU && PSU.name}
      <div>Power Supply</div>
      <div onClick={handleRemovePSU}>X</div>
    </div>
  );
}

export default PSUPart;
