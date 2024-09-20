import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async ({ username, password }) => {
    setLoading(true);
    const success = handleInputErrors({
      username,
      password,
    });
    if (!success) return;
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user-info", JSON.stringify(data.data));
      setAuthUser(data.data);
      navigate("/jobs");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      toast.success("Login Successfully");
    }
  };
  return { loading, login };
};

const handleInputErrors = ({ username, password }) => {
  if (!username || !password) {
    toast.error("Please fill all the fields");
    return false;
  }

  return true;
};
export default useLogin;
