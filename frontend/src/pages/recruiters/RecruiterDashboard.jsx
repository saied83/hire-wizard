import React, { useState } from "react";

import RecruiterProfile from "./RecruiterProfile";
import Rdashboard from "../../components/Rdashboard";

const RecruiterDashboard = () => {
  const [menu, setMenu] = useState(true);
  return (
    <>
      <nav className="w-full flex  justify-around rounded-b-3xl bg-second mt-8 ">
        <button
          onClick={() => setMenu((prev) => !prev)}
          className={`w-1/2  py-4 rounded-bl-3xl text-black text-xl font-semibold 
        ${menu ? "bg-[#940DF4] text-white" : ""}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setMenu((prev) => !prev)}
          className={`w-1/2  py-4 rounded-br-3xl text-black text-xl font-semibold 
        ${!menu ? "bg-[#940DF4] text-white" : ""}`}
        >
          Profile
        </button>
      </nav>
      <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
        {menu ? <Rdashboard /> : <RecruiterProfile />}
      </div>
    </>
  );
};

export default RecruiterDashboard;
