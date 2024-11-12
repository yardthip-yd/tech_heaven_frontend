import { getProductByCategory } from "@/API/product-api";
import { getLocalStorage, setLocalStorage } from "@/utils/local-storage";
import { createContext, useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

export const PCBuildContext = createContext();

export const PCBuildProvider = ({ children }) => {
  const [partContent, setPartContent] = useState(() =>
    getLocalStorage("partContent", 1)
  );
  const [CPU, setCPU] = useState(() => getLocalStorage("CPU", null));
  const [mainboard, setMainboard] = useState(() =>
    getLocalStorage("mainboard", null)
  );
  const [VGA, setVGA] = useState(() => getLocalStorage("VGA", null));
  const [RAM, setRAM] = useState(() => getLocalStorage("RAM", null));
  const [SSD, setSSD] = useState(() => getLocalStorage("SSD", null));
  const [HDD, setHDD] = useState(() => getLocalStorage("HDD", null));
  const [PSU, setPSU] = useState(() => getLocalStorage("PSU", null));
  const [PCCase, setPCCase] = useState(() => getLocalStorage("PCCase", null));
  const [cooler, setCooler] = useState(() => getLocalStorage("cooler", null));
  const [monitor, setMonitor] = useState(() =>
    getLocalStorage("monitor", null)
  );
  const [productList, setProductList] = useState(() =>
    getLocalStorage("productList", [])
  );
  const [filter, setFilter] = useState(() => getLocalStorage("filter", {}));
  const [filterJSON, setFilterJSON] = useState(() =>
    getLocalStorage("filterJSON", {})
  );

  useEffect(() => {
    setLocalStorage("partContent", partContent);
    setLocalStorage("CPU", CPU);
    setLocalStorage("mainboard", mainboard);
    setLocalStorage("VGA", VGA);
    setLocalStorage("RAM", RAM);
    setLocalStorage("SSD", SSD);
    setLocalStorage("HDD", HDD);
    setLocalStorage("PSU", PSU);
    setLocalStorage("PCCase", PCCase);
    setLocalStorage("cooler", cooler);
    setLocalStorage("monitor", monitor);
    // setLocalStorage("productList", productList);
    setLocalStorage("filter", filter);
    setLocalStorage("filterJSON", filterJSON);
  }, [
    CPU,
    mainboard,
    VGA,
    RAM,
    SSD,
    HDD,
    PSU,
    PCCase,
    cooler,
    monitor,
    filter,
    filterJSON,
  ]);

  return (
    <PCBuildContext.Provider
      value={{
        partContent,
        setPartContent,
        CPU,
        setCPU,
        mainboard,
        setMainboard,
        VGA,
        setVGA,
        RAM,
        setRAM,
        SSD,
        setSSD,
        HDD,
        setHDD,
        PSU,
        setPSU,
        PCCase,
        setPCCase,
        cooler,
        setCooler,
        monitor,
        setMonitor,
        filter,
        setFilter,
        filterJSON,
        setFilterJSON,
        productList,
        setProductList,
        // fetchPart,
      }}
    >
      {children}
    </PCBuildContext.Provider>
  );
};
