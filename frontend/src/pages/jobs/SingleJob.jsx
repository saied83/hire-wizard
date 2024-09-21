import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaMapLocation } from "react-icons/fa6";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const SingleJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cv, setCv] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();
    await fetch(`/api/v1/jobs/apply/${jobId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        cv,
      }),
    });
    toast.success("Apply Success");
    setName("");
    setEmail("");
    setCv("");
  };

  const [job, setJob] = useState({
    description: "",
    job_title: "",
    location: "",
    salary: "",
    year_exp: "",
    apply_limit: "",
    r_username: "",
    deadline: "",
    time_stamp: "",
    c_name: "",
    c_city: "",
    skills: [],
    applicant: [],
  });

  const loadJobs = async () => {
    const res = await fetch(`/api/v1/jobs/${jobId}`);
    const data = await res.json();
    const loadJob = data.data;

    setJob((prev) => ({
      ...prev,
      description: loadJob.description,
      job_title: loadJob.job_title,
      location: loadJob.location,
      salary: loadJob.salary,
      year_exp: loadJob.year_exp,
      c_name: loadJob.c_name,
      c_city: loadJob.c_city,
      apply_limit: loadJob.apply_limit,
      r_username: loadJob.r_username,
      deadline: loadJob.deadline,
      time_stamp: loadJob.time_stamp,
      skills: loadJob.skills,
      applicant: loadJob.applicant,
    }));
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="flex flex-col">
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50 w-full">
        <div className="container m-auto py-10 px-6">
          <div className="flex flex-col md:flex-row w-full gap-6">
            <main className=" md:w-[60%] lg:w-[70%]">
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4"></div>
                <div className="flex flex-col md:flex-row ">
                  <div className="md:w-[70%]">
                    <h1 className="text-3xl font-bold mb-4">{job.job_title}</h1>
                    <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                      <FaMapLocation className="text-orange-700 mr-1" />
                      <p className="text-orange-700">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex-1 ">
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex justify-center items-center gap-4 ">
                        <h3 className="text-indigo-800 text-sm text-md font-bold ">
                          Created:
                        </h3>

                        <p className="text-xs">{}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">${job.salary} / Year</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div className="flex flex-col md:flex-row ">
                  <div className="w-[50%]">
                    <h3 className="text-indigo-800 text-lg font-bold mb-6">
                      Year of Experience
                    </h3>

                    <p className="mb-4">{job.year_exp} Years</p>
                  </div>
                  <div>
                    <h3 className="text-indigo-800 text-lg font-bold mb-6">
                      Application Deadline
                    </h3>

                    <p className="mb-4">{}</p>
                  </div>
                </div>
              </div>
              {authUser.username !== job.r_username && (
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <form>
                    <h2 className="text-3xl text-center font-semibold mb-6">
                      Apply
                    </h2>

                    <div className="mb-4">
                      <label
                        htmlFor="title"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Applicant Name
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded w-full py-2 px-3 mb-2"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded w-full py-2 px-3 mb-2"
                        placeholder="johndoe@gmail.com"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Cover Letter
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={cv}
                        onChange={(e) => setCv(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                        rows="4"
                        placeholder="Add any job duties, expectations, requirements, etc"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <button
                        onClick={handleApply}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Add Job
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </main>

            {/* <!-- Sidebar --> */}
            <aside className="flex-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">{job.c_name}</h2>

                <p className="my-2">{job.c_city}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Recruiter</h3>

                <p
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/recruiters/${job.r_username}`);
                  }}
                  className="my-2 bg-indigo-100 p-2 font-bold cursor-pointer flex justify-center items-center hover:bg-indigo-500 hover:text-white rounded-full"
                >
                  {" "}
                  {job.r_username}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Skills Required
                </h3>

                <div className="flex flex-row flex-wrap gap-4">
                  {job.skills.map((skill, indx) => (
                    <p
                      key={indx}
                      className="  py-1 text-sm px-2 bg-indigo-200 rounded-full outline-primary text-tx font-semibold "
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
              {authUser.username === job.r_username && (
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                  <Link
                    to={`/jobs/edit/`}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                  >
                    Edit Job
                  </Link>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                    Delete Job
                  </button>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleJob;
