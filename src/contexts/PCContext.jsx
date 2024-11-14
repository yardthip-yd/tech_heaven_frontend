import { getSessionStorage, setSessionStorage } from "@/utils/session-storage";
import { createContext, useEffect, useState } from "react";

export const PCBuildContext = createContext();

export const PCBuildProvider = ({ children }) => {
  const [partContent, setPartContent] = useState(() =>
    getSessionStorage("partContent", 1)
  );
  const [CPU, setCPU] = useState(() => getSessionStorage("CPU", null));
  const [mainboard, setMainboard] = useState(() =>
    getSessionStorage("mainboard", null)
  );
  const [VGA, setVGA] = useState(() => getSessionStorage("VGA", null));
  const [RAM, setRAM] = useState(() => getSessionStorage("RAM", null));
  const [SSD, setSSD] = useState(() => getSessionStorage("SSD", null));
  const [HDD, setHDD] = useState(() => getSessionStorage("HDD", null));
  const [PSU, setPSU] = useState(() => getSessionStorage("PSU", null));
  const [PCCase, setPCCase] = useState(() => getSessionStorage("PCCase", null));
  const [cooler, setCooler] = useState(() => getSessionStorage("cooler", null));
  const [monitor, setMonitor] = useState(() =>
    getSessionStorage("monitor", null)
  );
  const [productList, setProductList] = useState(() =>
    getSessionStorage("productList", [])
  );
  const [filter, setFilter] = useState(() => getSessionStorage("filter", {}));
  const [filterJSON, setFilterJSON] = useState(() =>
    getSessionStorage("filterJSON", {})
  );

  const [buildList, setBuildList] = useState(() =>
    getSessionStorage("buildList", [])
  );

  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    setSessionStorage("partContent", partContent);
    setSessionStorage("CPU", CPU);
    setSessionStorage("mainboard", mainboard);
    setSessionStorage("VGA", VGA);
    setSessionStorage("RAM", RAM);
    setSessionStorage("SSD", SSD);
    setSessionStorage("HDD", HDD);
    setSessionStorage("PSU", PSU);
    setSessionStorage("PCCase", PCCase);
    setSessionStorage("cooler", cooler);
    setSessionStorage("monitor", monitor);
    // setSessionStorage("productList", productList);
    setSessionStorage("filter", filter);
    setSessionStorage("filterJSON", filterJSON);
    setSessionStorage("buildList", buildList);
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
        buildList,
        setBuildList,
        searchItem,
        setSearchItem,
      }}
    >
      {children}
    </PCBuildContext.Provider>
  );
};
