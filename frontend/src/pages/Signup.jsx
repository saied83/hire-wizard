import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("Recruiter");
  const [gender, setGender] = useState("male");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("2001-02-22");

  const { loading, signup } = useSignup();
  const newUser = {
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
    type,
    gender,
    bio,
    phone,
    dob,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newUser);
    await signup(newUser);
  };

  return (
    <div className="w-full  flex justify-center mt-12">
      <div className="w-full md:w-[80%]  lg:w-[50%]  flex justify-start flex-col bg-second md:py-16 md:px-20 py-8 px-16 rounded-3xl">
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-3xl text-bold">SIGNUP</h2>
        </div>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="py-2 px-4 text-lg  text-tx   rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="py-2 px-4 text-lg  text-tx  rounded-lg w-full"
            />
          </div>
          <div className=" flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-4 text-lg   text-tx  rounded-lg w-full"
            />{" "}
            <input
              type="text"
              placeholder="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-2 px-4 text-lg  text-tx   rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-4 text-lg  text-tx  rounded-lg w-full"
            />
            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="py-2 px-4 text-lg   text-tx  rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <select
              className="py-2 px-4 text-lg text-tx bg-white  rounded-lg w-full"
              required
              onChange={(e) => setType(e.target.value)}
            >
              <option value="recruiter">Recruiter</option>
              <option value="hunter">Job Hunter</option>
            </select>
            <select
              onChange={(e) => setGender(e.target.value)}
              className="py-2 px-4 text-lg text-tx bg-white  rounded-lg w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="phone"
              required
              placeholder="01603-232389"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="py-2 px-4 text-lg  text-tx  rounded-lg w-full"
            />
            <input
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="py-2 px-4 text-lg   text-tx  rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <textarea
              id="bio"
              name="bio"
              rows="3"
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className=" mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-4"
              placeholder="Tell us about yourself"
            ></textarea>
          </div>
          <button className=" mt-2 font-semibold hover:bg-gray-900 w-full py-2 px-4 bg-primary text-white rounded-lg">
            {" "}
            Create Account
          </button>
          <div className="inline-flex gap-4 items-center">
            <p>Already have account?</p>{" "}
            <button
              disabled={loading}
              to="/login"
              className="cursor-pointer text-red-600 text-lg "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
