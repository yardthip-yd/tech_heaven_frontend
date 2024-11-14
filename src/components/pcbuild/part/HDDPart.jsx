import { IconHDD } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";
import { Trash } from "lucide-react";

function HDDPart() {
  const {
    setFilter,
    setPartContent,
    HDD,
    setHDD,
    setFilterJSON,
    setSearchItem,
  } = useContext(PCBuildContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setFilter((prev) => {
      prev.drive = { type: "HDD" };
      setFilterJSON(JSON.stringify(prev));
      return prev;
    });
    setPartContent(9);
    setSearchItem("");
  };

  const handleRemoveHDD = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHDD(null);
  };

  return (
    <div
      className="relative flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer group border-b"
      onClick={handleClick}
    >
      <div className="w-6 h-6 flex items-center justify-center rounded-full text-blue-600">
        <IconHDD className={`${HDD? "w-4 h-4" : "w-6 h-6"}`}/>
      </div>
      
      <div className="flex-grow">
        <div className="text-base font-semibold text-slate-800">
          {HDD ? HDD.name : "Select HDD"}
        </div>
        {!HDD && (
          <div className="text-xs text-slate-500">
            Click to choose your HDD
          </div>
        )}
      </div>

      {HDD && (
        <button
          onClick={handleRemoveHDD}
          className="w-3 h-3 text-slate-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Remove HDD"
        >
          <Trash className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default HDDPart;
