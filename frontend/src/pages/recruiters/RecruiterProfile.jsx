import React, { useEffect, useState } from "react";
import { Mail, Phone, Cake, MapPin, Briefcase, Building } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
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
      const res = await fetch(`/api/v1/recruiters/single/${username}`);
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
      toast.error("User not found");
    }
  };
  useEffect(() => {
    getSingleRecruiter();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirm = window.confirm(
      "Are you Sure you want to delete your Recruiter Profile?"
    );
    if (!confirm) return;
    await fetch(`/api/v1/recruiters/profile/delete/${username}`, {
      method: "DELETE",
    });
    navigate(`/recruiters/create/${username}`);
  };

  return (
    <>
      {recruiter.r_username === undefined ? (
        <>
          {authUser.username === username ? (
            <>{navigate(`/recruiters/create/${authUser.username}`)}</>
          ) : (
            <>{navigate("/jobs")}</>
          )}
        </>
      ) : (
        <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              {/* Profile Picture and Name */}
              <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:items-end sm:space-x-5">
                  <div className="flex">
                    <img
                      className="h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-white"
                      src={recruiter.profile_pic}
                      alt={`${recruiter.first_name} ${recruiter.last_name}`}
                    />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:flex-1 sm:min-w-0">
                    <h1 className="text-2xl font-bold text-gray-900 truncate">
                      {recruiter.first_name} {recruiter.last_name}
                    </h1>
                    <p className="text-sm font-medium text-gray-500">
                      @{recruiter.r_username}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="px-4 py-5 sm:px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Designation
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">
                      {recruiter.company.designation}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Building className="mr-2 h-5 w-5" />
                      Company
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">
                      {recruiter.company.c_name}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Mail className="mr-2 h-5 w-5" />
                      Email
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {recruiter.email}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Phone className="mr-2 h-5 w-5" />
                      Phone
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {recruiter.phone_no}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Cake className="mr-2 h-5 w-5" />
                      Date of Birth
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(recruiter.dob).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <MapPin className="mr-2 h-5 w-5" />
                      Location
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {recruiter.company.c_city}, {recruiter.company.c_country}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Bio</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {recruiter.bio}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Company Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {recruiter.company.c_street}, {recruiter.company.c_city},{" "}
                      {recruiter.company.c_zip}, {recruiter.company.c_country}
                    </dd>
                  </div>
                </dl>
              </div>
              {authUser.username === username ? (
                <div className="flex justify-end mr-8 items-center gap-12 mb-6">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/recruiters/edit/${username}`);
                    }}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-center  py-2 px-4 rounded-full  focus:outline-none focus:shadow-outline block"
                  >
                    Edit profile
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500  hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline block"
                  >
                    Delete Profile
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecruiterProfile;
