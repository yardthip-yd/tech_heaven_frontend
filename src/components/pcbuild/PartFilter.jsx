import React, { useContext } from "react";
import { PCBuildContext } from "@/contexts/PCContext";
import { Search } from "lucide-react";

function PartFilter(props) {
  const { setFilterProductList, productList } = props;

  const { searchItem, setSearchItem } = useContext(PCBuildContext);

  const handleInputChange = (event) => {
    setSearchItem(event.target.value);
  };

  return (
    <div className="w-[1440px] mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-10 relative w-full lg:w-1/2 mx-auto">
        <Search className="absolute left-4 text-slate-400 h-5 w-5" />
        <input type="text" placeholder="Search products..." onChange={handleInputChange} value={searchItem} className="w-full px-10 py-2 rounded-lg border border-gray-300 shadow-sm" />
      </div>
    </div >
  );
}

export default PartFilter;
