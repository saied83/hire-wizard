import React, { createContext, useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [recruiterProfile, setRecruiterProfile] = useState([]);
  const [hunterProfile, setHunterProfile] = useState([]);

  const fetchRecruiterProfile = async () => {
    const res = await fetch("/api/v1/recruiters/all");
    const data = await res.json();
    setRecruiterProfile(data.data);
  };

  const fetchHunterProfile = async () => {
    const res = await fetch("/api/v1/hunters/all");
    const data = await res.json();
    setHunterProfile(data.data);
  };
  useEffect(() => {
    fetchRecruiterProfile();
    fetchHunterProfile();
  }, []);

  return (
    <UserContext.Provider value={{ recruiterProfile, hunterProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
