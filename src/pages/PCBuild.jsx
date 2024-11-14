import PartBar from "@/components/pcbuild/PartBar";
import PartContainer from "@/components/pcbuild/PartContainer";
import { PCBuildProvider } from "@/contexts/PCContext";
import React, { useState } from "react";
import PartFilter from "@/components/pcbuild/PartFilter";

function PCBuild() {
  const [productList, setProductList] = useState([]);
  const [filterProductList, setFilterProductList] = useState([]);
  return (
    <div className="relative flex w-[1440px] mx-auto py-8 ">
      <PCBuildProvider>
        <div>
          <PartFilter
            setFilterProductList={setFilterProductList}
            productList={productList}
          />
          <div className="flex flex-col lg:flex-row gap-6">
            <PartBar />
            <PartContainer />
          </div>
        </div>
      </PCBuildProvider>
    </div>
  );
}

export default PCBuild;
