import { IconCPUCooler } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";

function CPUCoolerPart() {
  const { setPartContent, cooler, setCooler, setFilter, setSearchItem } =
    useContext(PCBuildContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setSearchItem("");
    setPartContent(3);
  };

  const handleRemoveCPUCooler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCooler(null);
    setFilter((prev) => {
      const { cooler, ...rest } = prev;
      // console.log("prev", rest);
      // setFilterJSON(JSON.stringify(rest));
      return rest;
    });
    // console.log(filterJSON);
  };

  return (
    <div
      className="flex text-lg font-bold items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-9 h-9 flex items-center justify-center">
        <IconCPUCooler />
      </div>
      {cooler && cooler.name}
      <div>CPU Cooler</div>
      <div onClick={handleRemoveCPUCooler}>X</div>
    </div>
  );
}

export default CPUCoolerPart;
