import React, { createContext, useContext, useEffect, useState } from "react";
export const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

const DataContextProvider = ({ children }) => {
  const [jobHunters, setJobHunters] = useState([]);
  const [jobs, setJobs] = useState({});
  const hunterLoad = async () => {
    try {
      const res = await fetch(`/api/v1/hunters/all`);
      const data = await res.json();
      setJobHunters(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const jobLoad = async () => {
    try {
      const res = await fetch(`/api/v1/jobs/all`);
      const data = await res.json();
      setJobs(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hunterLoad();
    jobLoad();
  }, []);
  return (
    <DataContext.Provider value={{ jobHunters, jobs }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataContextProvider;
