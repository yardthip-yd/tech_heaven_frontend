import { IconSSD } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";

function SSDPart() {
  const { setFilter, setPartContent, SSD, setSSD, setFilterJSON } =
    useContext(PCBuildContext);

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
      className="flex text-lg font-bold items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-9 h-9 flex items-center justify-center">
        <IconSSD />
      </div>
      {SSD && SSD.name}
      <div>SSD</div>
      <div onClick={handleRemoveSSD}>X</div>
    </div>
  );
}

export default SSDPart;
