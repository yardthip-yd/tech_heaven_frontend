import { IconSSD } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";
import { Trash } from "lucide-react";

function SSDPart() {
  const {
    setFilter,
    setPartContent,
    SSD,
    setSSD,
    setFilterJSON,
    setSearchItem,
  } = useContext(PCBuildContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setFilter((prev) => {
      prev.drive = { type: "SSD" };
      setFilterJSON(JSON.stringify(prev));
      return prev;
    });
    setPartContent(9);
    setSearchItem("");
  };

  const handleRemoveSSD = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSSD(null);
  };

  return (
    <div
      className="relative flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer group border-b"
      onClick={handleClick}
    >
      <div className="w-6 h-6 flex items-center justify-center rounded-full text-blue-600">
        <IconSSD className={`${SSD ? "w-4 h-4" : "w-6 h-6"}`} />
      </div>

      <div className="flex-grow">
        <div className="text-base font-semibold text-slate-800">
          {SSD ? SSD.name : "Select SSD"}
        </div>
        {!SSD && (
          <div className="text-xs text-slate-500">Click to choose your SSD</div>
        )}
      </div>

      {SSD && (
        <button
          onClick={handleRemoveSSD}
          className="w-3 h-3 text-slate-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Remove SSD"
        >
          <Trash className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default SSDPart;
