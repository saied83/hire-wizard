import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className=" w-[80%] md:w-[40%]  flex justify-start flex-col bg-second py-16 px-32 rounded-3xl">
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-3xl text-bold">LOGIN</h2>
        </div>
        <form className="w-full mt-4 flex flex-col gap-4">
          <input
            type="text"
            placeholder="username"
            className="py-2 px-4 text-lg  rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="password"
            className="py-2 px-4 text-lg rounded-lg w-full"
          />
          <button className=" mt-2 hover:bg-gray-900 w-full py-2 px-4 bg-primary text-white rounded-lg">
            {" "}
            Login
          </button>
          <div className="inline-flex justify-around mt-4">
            <p>Don't have any account?</p>{" "}
            <Link to="/signup" className="cursor-pointer text-red-600">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
