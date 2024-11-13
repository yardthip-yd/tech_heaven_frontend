import React, { useContext } from "react";
import { Input } from "../ui/input";
import { PCBuildContext } from "@/contexts/PCContext";

function PartFilter(props) {
  const { setFilterProductList, productList } = props;

  const { searchItem, setSearchItem } = useContext(PCBuildContext);

  const handleInputChange = (event) => {
    setSearchItem(event.target.value);
  };

  return (
    <div className="p-2">
      Search:
      <Input type="text" onChange={handleInputChange} value={searchItem} />
    </div>
  );
}

export default PartFilter;
