import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext } from "react";

function CPUPart() {
  const { partContent, setPartContent } = useContext(PCBuildContext);

  const handleClick = () => {
    console.log("onClick");
    setPartContent(1);
  };

  return <div onClick={handleClick}>CPUPart</div>;
}

export default CPUPart;
