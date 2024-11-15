import { IconVGA } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";
import { Trash } from "lucide-react";

function VGAPart() {
  const { setPartContent, VGA, setVGA, setSearchItem } =
    useContext(PCBuildContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setPartContent(6);
    setSearchItem("");
  };

  const handleRemoveVGA = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVGA(null);
  };

  return (
    <div
      className="relative flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer group border-b"
      onClick={handleClick}
    >
      <div className="w-6 h-6 flex items-center justify-center rounded-full text-blue-600">
        <IconVGA className={`${VGA ? "w-4 h-4" : "w-6 h-6"}`} />
      </div>

      <div className="flex-grow">
        <div className="text-base font-semibold text-slate-800">
          {VGA ? VGA.name : "Select Graphic Card"}
        </div>
        {!VGA && (
          <div className="text-xs text-slate-500">
            Click to choose your graphic card
          </div>
        )}
      </div>

      {VGA && (
        <button
          onClick={handleRemoveVGA}
          className="w-3 h-3 text-slate-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Remove VGA"
        >
          <Trash className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default VGAPart;
