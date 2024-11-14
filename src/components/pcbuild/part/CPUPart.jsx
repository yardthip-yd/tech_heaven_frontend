import { IconCPU } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";
import { Trash } from "lucide-react";

function CPUPart() {
  const {
    setPartContent,
    CPU,
    setCPU,
    setFilter,
    setFilterJSON,
    setSearchItem,
  } = useContext(PCBuildContext);

  const handleClick = (e) => {
    e.preventDefault();
    setPartContent(1);
    setSearchItem("");
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
      className="relative flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer group border-b"
      onClick={handleClick}
    >
      <div className="w-6 h-6 flex items-center justify-center rounded-full text-blue-600">
        <IconCPU className={`${CPU ? "w-4 h-4" : "w-6 h-6"}`} />
      </div>

      <div className="flex-grow">
        <div className="text-base font-semibold text-slate-800">
          {CPU ? CPU.name : "Select CPU"}
        </div>
        {!CPU && (
          <div className="text-xs text-slate-500">
            Click to choose your CPU
          </div>
        )}
      </div>

      {CPU && (
        <button
          onClick={handleRemoveCPU}
          className="w-3 h-3 text-slate-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Remove CPU"
        >
          <Trash className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default CPUPart;
