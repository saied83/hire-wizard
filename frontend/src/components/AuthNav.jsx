import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";

const AuthNav = () => {
  const { authUser } = useAuthContext();
  const links = {
    hunter: [
      { title: "Find Jobs", link: `/jobs` },
      { title: "H Profile", link: `/hunters/${authUser?.username}` },
      {
        title: "Edit Profile",
        link: `/hunters/edit/${authUser?.username}`,
      },
      {
        title: "As Recruiter",
        link: `/recruiters/${authUser?.username}`,
      },
    ],
    recruiter: [
      { title: "Find Hunter", link: `/hunters` },
      {
        title: "R Dashboard",
        link: `/recruiters/dashboard/${authUser?.username}`,
      },
      { title: "Create Job", link: `/jobs/create` },
      { title: "As Hunter", link: `/hunters/${authUser?.username}` },
    ],
  };

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const { loading, logout } = useLogout();
  const [type, setType] = useState(true);
  const [menu, setMenu] = useState(links.recruiter);

  const handleLogout = async (e) => {
    e.preventDefault();

    await logout();
    navigate("/login");
  };

  useEffect(() => {
    if (!type) {
      setMenu(links.hunter);
    } else {
      setMenu(links.recruiter);
    }
  }, [type]);

  return (
    <div className="w-full  relative bg-second  ">
      <div>
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <div className="flex justify-between items-center py-2 ">
            <NavLink to="/" className="cursor-pointer">
              <img src="/logo.png" alt="" className="w-[200px] h-auto" />
            </NavLink>
            <div className="hidden md:inline-flex ">
              {" "}
              <NavLink
                to={menu[0].link}
                className="py-2  md:px-4 lg:px-6 text-tx md:font-normal lg:font-medium lg:text-lg   "
              >
                {menu[0].title}
                <hr className="w-full outline-none border-[1.5px] border-gray-500 hidden" />
              </NavLink>
              <NavLink
                to={menu[1].link}
                className="py-2  md:px-4 lg:px-6 text-tx md:font-normal  lg:font-medium lg:text-lg   "
              >
                {menu[1].title}
                <hr className="w-full outline-none border-[1.5px] border-gray-500 hidden" />
              </NavLink>
              <NavLink
                to={menu[2].link}
                className="py-2 md:px-4 lg:px-6 text-tx  md:font-normal  lg:font-medium lg:text-lg   "
              >
                {menu[2].title}
                <hr className="w-full outline-none border-[1.5px] border-gray-500 hidden" />
              </NavLink>
              <NavLink
                to={menu[3].link}
                onClick={() => {
                  setType((prev) => !prev);
                }}
                className="py-2 md:px-4 lg:px-6 text-tx  md:font-normal lg:font-medium lg:text-lg   "
              >
                {menu[3].title}
                <hr className="w-full outline-none border-[1.5px] border-gray-500 hidden" />
              </NavLink>
              <button
                onClick={handleLogout}
                className=" md:px-4 lg:px-8   lg:font-medium lg:text-lg  rounded-full hover:bg-red-400 hover:text-black text-white bg-tx py-2  "
              >
                Logout
              </button>
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
            to={menu[0].link}
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-tx font-semibold ml-4 mt-2 pl-4 border-b-2 py-2 "
          >
            {menu[0].title}
          </NavLink>
          <NavLink
            to={menu[1].link}
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-tx font-semibold ml-4 mt-2 pl-4 border-b-2 py-2 "
          >
            {menu[1].title}
          </NavLink>
          <NavLink
            to={menu[2].link}
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-tx font-semibold ml-4 mt-2 pl-4 border-b-2 py-2 "
          >
            {menu[2].title}
          </NavLink>
          <NavLink
            to={menu[3].link}
            onClick={() => {
              setShowMenu((prev) => !prev);
              setType((prev) => !prev);
            }}
            className="text-tx font-semibold ml-4 mt-2 pl-4 border-b-2 py-2 "
          >
            {menu[3].title}
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-tx font-semibold ml-4 mt-2 pl-4 border-b-2 py-2 "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthNav;
