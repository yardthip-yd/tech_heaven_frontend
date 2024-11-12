import { IconMonitor } from "@/components/ui/Icon";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";

function MonitorPart() {
  const { setPartContent, monitor, setMonitor, setFilter } =
    useContext(PCBuildContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setPartContent(2);
  };

  const handleRemoveMonitor = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMonitor(null);
  };

  return (
    <div
      className="flex text-lg font-bold items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-9 h-9 flex items-center justify-center">
        <IconMonitor />
      </div>
      {monitor && monitor.name}
      <div>Monitor</div>
      <div onClick={handleRemoveMonitor}>X</div>
    </div>
  );
}

export default MonitorPart;
