import PartBar from "@/components/pcbuild/PartBar";
import PartContainer from "@/components/pcbuild/PartContainer";
import React from "react";

function PCBuild() {
  return (
    <div className="flex h-full w-full px-20">
      <PartBar />
      <PartContainer />
    </div>
  );
}

export default PCBuild;
