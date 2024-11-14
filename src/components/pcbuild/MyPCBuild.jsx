import { getPCBuildList } from "@/API/product-api";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext, useEffect } from "react";
import PCBuildItem from "./PCBuildItem";

function MyPCBuild() {
  const { buildList, setBuildList } = useContext(PCBuildContext);

  const getBuildList = async () => {
    // console.log("buildList", buildList);
    const response = await getPCBuildList();
    // console.log(response);
    setBuildList(response.data.build);
  };

  useEffect(() => {
    // console.log("buildList", buildList);
    getBuildList();
  }, []);

  return (
    <div className="flex flex-col">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-black via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CUTOMIZE YOUR SPEC
              </h2>
      <div className="flex">
        {buildList.map((item) => (
          <PCBuildItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default MyPCBuild;
