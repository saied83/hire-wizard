import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";

const AuthNav = () => {
  const { authUser } = useAuthContext();
  const links = {
    hunter: {
      first: { title: "Find Jobs", link: `/jobs` },
      second: { title: "My Profile", link: `/hunters/${authUser?.username}` },
      third: {
        title: "Edit Profile",
        link: `/hunters/edit/${authUser?.username}`,
      },
      forth: {
        title: "As Recruiter",
        link: `/recruiters/${authUser?.username}`,
      },
    },
    recruiter: {
      first: { title: "Find Hunter", link: `/hunters` },
      second: {
        title: "My Profile",
        link: `/recruiters/dashboard/${authUser?.username}`,
      },
      third: { title: "As Hunter", link: `/hunters/${authUser?.username}` },
      forth: { title: "Create Job", link: `/jobs/create` },
    },
  };

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const { loading, logout } = useLogout();
  const [type, setType] = useState(true);

  const handleLogout = async (e) => {
    e.preventDefault();

    await logout();
    navigate("/login");
  };
  let menu = links.recruiter;
  useEffect(() => {
    if (!type) {
      menu = links.hunter;
    } else {
      menu = links.recruiter;
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
                to={menu.first.link}
                className="py-2  md:px-4 lg:px-6 text-tx md:font-normal lg:font-medium lg:text-lg   "
              >
                {menu.first.title}
                <hr className="w-full outline-none border-[1.5px] border-gray-500 hidden" />
              </NavLink>
              <NavLink
                to={menu.second.link}
                className="py-2  md:px-4 lg:px-6 text-tx md:font-normal  lg:font-medium lg:text-lg   "
              >
                {menu.second.title}
                <hr className="w-full outline-none border-[1.5px] border-gray-500 hidden" />
              </NavLink>
              <NavLink
                to={menu.third.link}
                onClick={() => setType((prev) => !prev)}
                className="py-2 md:px-4 lg:px-6 text-tx  md:font-normal  lg:font-medium lg:text-lg   "
              >
                {menu.third.title}
                <hr className="w-full outline-none border-[1.5px] border-gray-500 hidden" />
              </NavLink>
              <NavLink
                to={menu.forth.link}
                className="py-2 md:px-4 lg:px-6 text-tx  md:font-normal lg:font-medium lg:text-lg   "
              >
                {menu.forth.title}
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
            to={menu.first.link}
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-tx font-semibold ml-4 mt-2 pl-4 border-b-2 py-2 "
          >
            {menu.first.title}
          </NavLink>
          <NavLink
            to={menu.second.link}
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-tx font-semibold ml-4 mt-2 pl-4 border-b-2 py-2 "
          >
            {menu.second.title}
          </NavLink>
          <NavLink
            to={menu.third.link}
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-tx font-semibold ml-4 mt-2 pl-4 border-b-2 py-2 "
          >
            {menu.third.title}
          </NavLink>
          <NavLink
            to={menu.forth.link}
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-tx font-semibold ml-4 mt-2 pl-4 border-b-2 py-2 "
          >
            {menu.forth.title}
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
