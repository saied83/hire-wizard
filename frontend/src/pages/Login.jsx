import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full  flex justify-center  mt-24">
      <div className="w-full md:w-[80%]  lg:w-[40%]  flex justify-start flex-col bg-second md:py-16 md:px-20 py-8 px-16 rounded-3xl">
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-3xl text-bold">LOGIN</h2>
        </div>
        <form className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="username"
            required
            className="py-2 px-4 text-lg  text-tx   rounded-lg w-full"
          />

          <input
            type="text"
            required
            placeholder="Password"
            className="py-2 px-4 text-lg  text-tx  rounded-lg w-full"
          />

          <button className=" mt-2 font-semibold hover:bg-gray-900 w-full py-2 px-4 bg-primary text-white rounded-lg">
            {" "}
            Login
          </button>
          <div className="inline-flex gap-4 items-center">
            <p>Already have account?</p>{" "}
            <Link to="/signup" className="cursor-pointer text-red-600 text-lg ">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
