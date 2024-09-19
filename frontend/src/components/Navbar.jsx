import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="w-full relative bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 ">
      <div>
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <div className="flex justify-between items-center py-2 ">
            <div>
              <img src="/logo.png" alt="" className="w-[200px] h-auto" />
            </div>
            <div className="hidden md:inline-flex ">
              <NavLink
                to="/"
                className="py-2 md:px-4 lg:px-6 text-primary md:font-normal mr-4  lg:font-medium lg:text-lg "
              >
                Find Talent
                <hr className="w-full outline-none border-[1.5px] border-gray-500 hidden" />
              </NavLink>
              <NavLink
                to="/"
                className="py-2 md:px-4 lg:px-6 text-primary md:font-normal mr-4  lg:font-medium lg:text-lg "
              >
                Jobs
                <hr className="w-full outline-none border-[1.5px] border-gray-500 hidden" />
              </NavLink>
              <NavLink
                to="/"
                className="py-2 md:px-4 lg:px-6 text-primary md:font-normal mr-4  lg:font-medium lg:text-lg "
              >
                Login
                <hr className="w-full outline-none border-[1.5px] border-gray-500 hidden" />
              </NavLink>
              <NavLink
                to="/"
                className=" md:px-4 lg:px-8 text-primary md:font-normal   lg:font-medium lg:text-lg  rounded-full bg-second hover:bg-bgl py-2"
              >
                Signup
              </NavLink>
            </div>
            <a
              onClick={() => setShowMenu(true)}
              className="py-2 md:px-4 lg:px-6 text-primary md:font-normal mr-4  lg:font-medium lg:text-lg md:hidden"
            >
              <img src="/menu.svg" alt="" className="w-[24px]" />
            </a>
          </div>
        </div>
      </div>
      <div
        className={`w-[80vw] z-10 absolute top-0 bg-[#F4FCFC] opacity-200 h-[100vh] right-0 ${
          showMenu ? "block" : "hidden"
        }`}
      >
        <div
          className="w-full mt-6 justify-start ml-4 flex items-center"
          onClick={() => setShowMenu(false)}
        >
          <img src="/close.svg" className="w-[24px]" alt="" />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <NavLink className="text-primary ml-4 mt-2 pl-4 border-b-2 py-2 ">
            Find Talent
          </NavLink>
          <NavLink className="text-primary ml-4 mt-2 pl-4 border-b-2 py-2 ">
            Jobs
          </NavLink>
          <NavLink className="text-primary ml-4 mt-2 pl-4 border-b-2 py-2 ">
            Login
          </NavLink>
          <NavLink className="text-primary ml-4 mt-2 pl-4 border-b-2 py-2 ">
            Signup
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
