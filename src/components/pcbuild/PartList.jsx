import { getProductByCategory } from "@/API/product-api";
import { PCBuildContext } from "@/contexts/PCContext";
import React, { useContext, useEffect, useState } from "react";
import ProductCardBuild from "../product/ProductCardBuild";
import useDeepCompareEffect from "use-deep-compare-effect";

function PartList() {
  // const { partContent, filter, productList, setProductList, filterJSON } =
  //   useContext(PCBuildContext);
  const { partContent, filter, filterJSON } = useContext(PCBuildContext);

  const [productList, setProductList] = useState([]);

  const getPart = async () => {
    switch (partContent) {
      case 1: // CPU
        return await getProductByCategory(1, filter);
      case 2: // Monitor
        return await getProductByCategory(2, filter);
      case 3: // CPU Cooler
        return await getProductByCategory(3, filter);
      case 4: // Power Supply
        return await getProductByCategory(4, filter);
      case 5: // Case
        return await getProductByCategory(5, filter);
      case 6: // GPU
        return await getProductByCategory(6, filter);
      case 7: // Memory
        return await getProductByCategory(7, filter);
      case 8: // Motherboard
        return await getProductByCategory(8, filter);
      case 9: // Drive
        return await getProductByCategory(9, filter);
    }
  };

  const fetchPart = async () => {
    console.log("partContent", partContent);
    console.log("filter", filter);
    const response = await getPart();
    // console.log(response.data.products);
    setProductList(response.data.products);
  };

  useDeepCompareEffect(() => {
    fetchPart();
  }, [partContent, filter, filterJSON]);

  // useEffect(() => {}, [productList, filterJSON]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-gray-100 p-2">
      {productList.map((product) => (
        <ProductCardBuild key={product.id} product={product} />
      ))}
    </div>
  );
}

export default PartList;
