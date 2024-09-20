import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const UnAuthNav = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="w-full h-[70px] relative bg-second  ">
      <div>
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <div className="flex justify-between items-center py-2 ">
            <NavLink to="/" className="cursor-pointer">
              <img src="/logo.png" alt="" className="w-[200px] h-auto" />
            </NavLink>
            <div className="hidden md:inline-flex ">
              <NavLink
                to="/hunters"
                className="py-2  md:px-4 lg:px-6 text-tx md:font-normal mr-2  lg:font-bold lg:text-lg   "
              >
                Find Talent
                <hr className="w-full outline-none border-[1.5px] border-gray-500 hidden" />
              </NavLink>
              <NavLink
                to="/jobs"
                className="py-2 md:px-4 lg:px-6 text-tx  md:font-normal mr-2  lg:font-bold lg:text-lg   "
              >
                Jobs
                <hr className="w-full outline-none border-[1.5px] border-gray-500 hidden" />
              </NavLink>
              <NavLink
                to="/login"
                className="py-2 md:px-4 lg:px-6 text-tx  md:font-normal mr-2  lg:font-bold lg:text-lg   "
              >
                Login
                <hr className="w-full outline-none border-[1.5px] border-gray-500 hidden" />
              </NavLink>
              <NavLink
                to="/signup"
                className=" md:px-4 lg:px-8 ttext-tx md:font-normal   lg:font-bold lg:text-lg  rounded-full bg-primary hover:bg-ty py-2  "
              >
                Signup
              </NavLink>
            </div>
            <a
              onClick={() => setShowMenu(true)}
              className="py-2 md:px-4 lg:px-6 text-primary md:font-normal cursor-pointer  lg:font-medium lg:text-lg md:hidden"
            >
              <img src="/menu.svg" alt="" className="w-[30px]" />
            </a>
          </div>
        </div>
      </div>
      <div
        className={`w-[80vw] z-10 absolute top-0 bg-[#F4FCFC] opacity-200 h-[100vh] overflow-x-hidden right-0 ${
          showMenu ? "block" : "hidden"
        }`}
      >
        <div
          className="w-full mt-6 justify-start ml-4 cursor-pointer flex items-center"
          onClick={() => setShowMenu(false)}
        >
          <img src="/close.svg" className="w-[24px]" alt="" />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <NavLink
            to="/hunters"
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-tx font-medium ml-4 mt-2 pl-4 border-b-2 py-2 "
          >
            Find Talent
          </NavLink>
          <NavLink
            to="/jobs"
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-tx font-medium ml-4 mt-2 pl-4 border-b-2 py-2 "
          >
            Jobs
          </NavLink>
          <NavLink
            to="/login"
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-tx font-medium ml-4 mt-2 pl-4 border-b-2 py-2 "
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-black font-medium ml-4 mt-2 pl-4 border-b-2 py-2 "
          >
            Signup
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UnAuthNav;
