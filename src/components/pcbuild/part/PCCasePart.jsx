import { IconPCCase } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";

function PCCasePart() {
  const { setPartContent, PCCase, setPCCase } = useContext(PCBuildContext);

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
      className="flex text-lg font-bold items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-9 h-9 flex items-center justify-center">
        <IconPCCase />
      </div>
      {PCCase && PCCase.name}
      <div>Case</div>
      <div onClick={handleRemovePCCase}>X</div>
    </div>
  );
}

export default PCCasePart;
