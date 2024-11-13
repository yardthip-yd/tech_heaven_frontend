import { IconHDD } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";

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
      className="flex text-lg font-bold items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-9 h-9 flex items-center justify-center">
        <IconHDD />
      </div>
      {HDD && HDD.name}
      <div>HDD</div>
      <div onClick={handleRemoveHDD}>X</div>
    </div>
  );
}

export default HDDPart;
