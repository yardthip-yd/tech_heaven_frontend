import { IconMainboard } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";
import { Trash } from "lucide-react";

function MainboardPart() {
  const {
    setPartContent,
    mainboard,
    setMainboard,
    filterJSON,
    setFilter,
    setFilterJSON,
    setSearchItem,
  } = useContext(PCBuildContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setPartContent(8);
    setSearchItem("");
  };

  const handleRemoveMainboard = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMainboard(null);
    setFilter((prev) => {
      const { motherboard, ...rest } = prev;
      // console.log("prev", rest);
      setFilterJSON(JSON.stringify(rest));
      return rest;
    });
    console.log(filterJSON);
  };

  return (
    <div
      className="relative flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer group border-b"
      onClick={handleClick}
    >
      <div className="w-6 h-6 flex items-center justify-center rounded-full text-blue-600">
        <IconMainboard className={`${mainboard ? "w-4 h-4" : "w-6 h-6"}`}/>
      </div>

      <div className="flex-grow">
        <div className="text-base font-semibold text-slate-800">
          {mainboard ? mainboard.name : "Select Mainboard"}
        </div>
        {!mainboard && (
          <div className="text-xs text-slate-500">
            Click to choose your mainboard
          </div>
        )}
      </div>

      {mainboard && (
        <button
          onClick={handleRemoveMainboard}
          className="w-3 h-3 text-slate-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Remove Mainboard"
        >
          <Trash className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default MainboardPart;
