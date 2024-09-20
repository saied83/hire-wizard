import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { SingleRecruiter } from "../components";
import toast from "react-hot-toast";

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [recruiter, setRecruiter] = useState({
    r_username: "",
    bio: "",
    email: "",
    phone_no: "",
    time_stamp: "",
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    profile_pic: "",
    company: {
      c_city: "",
      c_zip: "",
      c_street: "",
      c_country: "",
      c_name: "",
      designation: "",
    },
  });

  const getSingleRecruiter = async () => {
    try {
      const res = await fetch(`/api/v1/recruiters/${username}`);
      const data = await res.json();
      const {
        r_username,
        dob,
        company,
        email,
        first_name,
        last_name,
        gender,
        phone_no,
        profile_pic,
        time_stamp,
      } = data.data;
      setRecruiter((prev) => ({
        ...prev,
        r_username,
        dob,
        company,
        email,
        first_name,
        last_name,
        gender,
        phone_no,
        profile_pic,
        time_stamp,
      }));
    } catch (error) {
      navigate("/jobs");
    }
  };
  useEffect(() => {
    getSingleRecruiter();
  }, []);

  return (
    <>
      {" "}
      <SingleRecruiter recruiter={recruiter} />
    </>
  );
};

export default RecruiterProfile;
