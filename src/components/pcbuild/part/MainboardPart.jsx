import { IconMainboard } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";

function MainboardPart() {
  const {
    setPartContent,
    mainboard,
    setMainboard,
    filterJSON,
    setFilter,
    setFilterJSON,
  } = useContext(PCBuildContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setPartContent(8);
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
      className="flex text-lg font-bold items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-9 h-9 flex items-center justify-center">
        <IconMainboard />
      </div>
      {mainboard && mainboard.name}
      <div>Mainboard</div>
      <div onClick={handleRemoveMainboard}>X</div>
    </div>
  );
}

export default MainboardPart;
