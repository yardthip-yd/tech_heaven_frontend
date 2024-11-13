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
    <div className="flex flex-col p-2 bg-gray-100">
      <div>Recent Build: </div>
      <div className="flex p-2">
        {buildList.map((item) => (
          <PCBuildItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default MyPCBuild;
