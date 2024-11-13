import { IconRAM } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";

function RAMPart() {
  const { setPartContent, RAM, setRAM, setFilter } = useContext(PCBuildContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setPartContent(7);
    setSearchItem("");
  };

  const handleRemoveMainboard = (e) => {
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
      className="flex text-lg font-bold items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-9 h-9 flex items-center justify-center">
        <IconRAM />
      </div>
      {RAM && RAM.name}
      <div>RAM</div>
      <div onClick={handleRemoveMainboard}>X</div>
    </div>
  );
}

export default RAMPart;
