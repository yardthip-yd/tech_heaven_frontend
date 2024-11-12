import { IconCPU } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";

function CPUPart() {
  const { setPartContent, CPU, setCPU, setFilter, setFilterJSON } =
    useContext(PCBuildContext);

  const handleClick = (e) => {
    e.preventDefault();
    setPartContent(1);
  };

  const handleRemoveCPU = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCPU(null);
    setFilter((prev) => {
      const { cpu, ...rest } = prev;
      setFilterJSON(JSON.stringify(rest));
      return rest;
    });
  };

  return (
    <div
      className="flex text-lg font-bold items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-9 h-9 flex items-center justify-center">
        <IconCPU />
      </div>
      {CPU && CPU.name}
      <div>CPU</div>
      <div onClick={handleRemoveCPU}>X</div>
    </div>
  );
}

export default CPUPart;
