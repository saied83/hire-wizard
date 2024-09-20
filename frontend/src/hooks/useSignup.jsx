import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const signup = async ({
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
  }) => {
    const success = handleInputErrors({
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
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          confirm_password: confirmPassword,
          bio: bio,
          email: email,
          phone_no: phone,
          first_name: firstName,
          last_name: lastName,
          dob: dob,

          gender,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user-info", JSON.stringify(data.data));
      setAuthUser(data.data);

      if (type === "recruiter") {
        navigate(`/recruiters/edit/${data.data.username}`);
      } else {
        navigate(`/hunters/edit/${data.data.username}`);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      toast(`Now create your ${type} account`);
    }
  };
  return { loading, signup };
};

const handleInputErrors = ({
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
}) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !username ||
    !password ||
    !confirmPassword ||
    !gender ||
    !type ||
    !bio ||
    !phone ||
    !dob
  ) {
    toast.error("Please fill all the fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
};
export default useSignup;
