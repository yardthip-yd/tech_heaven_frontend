import { IconVGA } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";

function VGAPart() {
  const { setPartContent, VGA, setVGA } = useContext(PCBuildContext);

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
      className="flex text-lg font-bold items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-9 h-9 flex items-center justify-center">
        <IconVGA />
      </div>
      {VGA && VGA.name}
      <div>Graphic Card</div>
      <div onClick={handleRemoveVGA}>X</div>
    </div>
  );
}

export default VGAPart;
