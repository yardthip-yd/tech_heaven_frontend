import { createContext, useState } from "react";

export const PCBuildContext = createContext();

export const PCBuildProvider = ({ children }) => {
  const [partContent, setPartContent] = useState(1);
  const [CPU, setCPU] = useState(null);
  const [mainboard, setMainboard] = useState(null);
  const [VGA, setVGA] = useState(null);
  const [RAM, setRAM] = useState(null);
  const [SSD, setSSD] = useState(null);
  const [HDD, setHDD] = useState(null);
  const [PSU, setPSU] = useState(null);
  const [PCCase, setPCCase] = useState(null);
  const [cooler, setCooler] = useState(null);
  const [monitor, setMonitor] = useState(null);

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
      }}
    >
      {children}
    </PCBuildContext.Provider>
  );
};
