import { IconCPUCooler } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";

import { Trash } from "lucide-react";

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
      className="relative flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer group border-b"
      onClick={handleClick}
    >
      <div className="w-6 h-6 flex items-center justify-center rounded-full text-blue-600">
        <IconCPUCooler className={`${cooler? "w-4 h-4" : "w-6 h-6"}`}/>
      </div>
      
      <div className="flex-grow">
        <div className="text-base font-semibold text-slate-800">
          {cooler ? cooler.name : "Select CPU Cooler"}
        </div>
        {!cooler && (
          <div className="text-xs text-slate-500">
            Click to choose your CPU cooler
          </div>
        )}
      </div>

      {cooler && (
        <button
          onClick={handleRemoveCPUCooler}
          className="w-3 h-3 text-slate-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Remove CPU Cooler"
        >
          <Trash className="w-4 h-4"/>
        </button>
      )}
    </div>
  );
}

export default CPUCoolerPart;
