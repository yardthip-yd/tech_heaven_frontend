import PartBar from "@/components/pcbuild/PartBar";
import PartContainer from "@/components/pcbuild/PartContainer";
import { PCBuildProvider } from "@/contexts/PCContext";
import React from "react";

function PCBuild() {
  return (
    <div className="flex h-full w-full px-20">
      <PCBuildProvider>
        <PartBar />
        <PartContainer />
      </PCBuildProvider>
    </div>
  );
}

export default PCBuild;
