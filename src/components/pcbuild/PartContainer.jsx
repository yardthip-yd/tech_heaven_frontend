import React from "react";
import PartFilter from "./PartFilter";
import PartList from "./PartList";

function PartContainer() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <PartFilter />
      <PartList />
    </div>
  );
}

export default PartContainer;
