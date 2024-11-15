import { IconPCCase } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";
import { Trash } from "lucide-react";

function PCCasePart() {
  const { setPartContent, PCCase, setPCCase, setSearchItem } =
    useContext(PCBuildContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setPartContent(5);
    setSearchItem("");
  };

  const handleRemovePCCase = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPCCase(null);
  };

  return (
    <div
      className="relative flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer group border-b"
      onClick={handleClick}
    >
      <div className="w-6 h-6 flex items-center justify-center rounded-full text-blue-600">
        <IconPCCase className={`${PCCase ? "w-4 h-4" : "w-6 h-6"}`} />
      </div>

      <div className="flex-grow">
        <div className="text-base font-semibold text-slate-800">
          {PCCase ? PCCase.name : "Select Case"}
        </div>
        {!PCCase && (
          <div className="text-xs text-slate-500">
            Click to choose your PC case
          </div>
        )}
      </div>

      {PCCase && (
        <button
          onClick={handleRemovePCCase}
          className="w-3 h-3 text-slate-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Remove PC Case"
        >
          <Trash className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default PCCasePart;
