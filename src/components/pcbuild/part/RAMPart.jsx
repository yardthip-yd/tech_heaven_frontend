import { IconRAM } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";
import { Trash } from "lucide-react";

function RAMPart() {
  const { setPartContent, RAM, setRAM, setFilter } = useContext(PCBuildContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setPartContent(7);
    setSearchItem("");
  };

  const handleRemoveRAM = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRAM(null);
    setFilter((prev) => {
      const { memory, ...rest } = prev;
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
        <IconRAM className={`${RAM ? "w-4 h-4" : "w-6 h-6"}`}/>
      </div>

      <div className="flex-grow">
        <div className="text-base font-semibold text-slate-800">
          {RAM ? RAM.name : "Select RAM"}
        </div>
        {!RAM && (
          <div className="text-xs text-slate-500">
            Click to choose your RAM
          </div>
        )}
      </div>

      {RAM && (
        <button
          onClick={handleRemoveRAM}
          className="w-3 h-3 text-slate-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Remove RAM"
        >
          <Trash className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default RAMPart;
