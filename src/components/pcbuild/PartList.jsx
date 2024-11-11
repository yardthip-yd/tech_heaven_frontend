import { getProductByCategory } from "@/API/product-api";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext, useEffect, useState } from "react";

function PartList() {
  const { partContent } = useContext(PCBuildContext);
  const [productList, setProductList] = useState([]);

  const getPart = async () => {
    switch (partContent) {
      case 1: // CPU
        return await getProductByCategory(1);
      case 2: // Monitor
        return await getProductByCategory(2);
      case 3: // CPU Cooler
        return await getProductByCategory(3);
      case 4: // Power Supply
        return await getProductByCategory(4);
      case 5: // Case
        return await getProductByCategory(5);
      case 6: // GPU
        return await getProductByCategory(6);
      case 7: // Memory
        return await getProductByCategory(7);
      case 8: // Motherboard
        return await getProductByCategory(8);
      case 9: // Drive
        return await getProductByCategory(9);
    }
  };

  const fetchPart = async () => {
    const response = await getPart();
    console.log(response.data.products);
    setProductList(response.data.products);
  };

  useEffect(() => {
    console.log("fetching");
    fetchPart();
  }, [partContent]);

  return <div className="flex-1">PartList</div>;
}

export default PartList;
