import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="w-full  flex justify-center mt-12">
      <div className="w-full md:w-[80%]  lg:w-[50%]  flex justify-start flex-col bg-second md:py-16 md:px-20 py-8 px-16 rounded-3xl">
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-3xl text-bold">SIGNUP</h2>
        </div>
        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="First Name"
              required
              className="py-2 px-4 text-lg  text-tx   rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              className="py-2 px-4 text-lg  text-tx  rounded-lg w-full"
            />
          </div>
          <div className=" flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              required
              className="py-2 px-4 text-lg   text-tx  rounded-lg w-full"
            />{" "}
            <input
              type="text"
              placeholder="username"
              required
              className="py-2 px-4 text-lg  text-tx   rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              required
              placeholder="Password"
              className="py-2 px-4 text-lg  text-tx  rounded-lg w-full"
            />
            <input
              type="text"
              required
              placeholder="Confirm Password"
              className="py-2 px-4 text-lg   text-tx  rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="date"
              required
              className="py-2 px-4 text-lg text-tx  rounded-lg w-full"
            />
            <select className="py-2 px-4 text-lg text-tx bg-white  rounded-lg w-full">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <button className=" mt-2 font-semibold hover:bg-gray-900 w-full py-2 px-4 bg-primary text-white rounded-lg">
            {" "}
            Login
          </button>
          <div className="inline-flex gap-4 items-center">
            <p>Already have account?</p>{" "}
            <Link to="/login" className="cursor-pointer text-red-600 text-lg ">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
