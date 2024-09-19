import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaMapLocation } from "react-icons/fa6";

const SingleJob = () => {
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
                    <h1 className="text-3xl font-bold mb-4">Web Developer</h1>
                    <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                      <FaMapLocation className="text-orange-700 mr-1" />
                      <p className="text-orange-700">New York</p>
                    </div>
                  </div>
                  <div className="flex-1 ">
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex justify-center items-center gap-4 ">
                        <h3 className="text-indigo-800 text-md font-bold ">
                          Created:
                        </h3>

                        <p className="text-md">10/10/2001</p>
                      </div>
                      <div className="flex justify-center items-center gap-4 ">
                        <h3 className="text-indigo-800 text-md font-bold ">
                          Deadline:
                        </h3>

                        <p className="text-md">10/10/2001</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">Develop and maintain web applications.</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">80000 / Year</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div className="flex flex-col md:flex-row ">
                  <div className="w-[50%]">
                    <h3 className="text-indigo-800 text-lg font-bold mb-6">
                      Year of Experience
                    </h3>

                    <p className="mb-4">3 Years</p>
                  </div>
                  <div>
                    <h3 className="text-indigo-800 text-lg font-bold mb-6">
                      Application Deadline
                    </h3>

                    <p className="mb-4">3 Years</p>
                  </div>
                </div>
              </div>

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
                      className="border rounded w-full py-2 px-3"
                      rows="4"
                      placeholder="Add any job duties, expectations, requirements, etc"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <button
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Add Job
                    </button>
                  </div>
                </form>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside className="flex-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">Company name</h2>

                <p className="my-2">location</p>

                <hr className="my-4" />

                <h3 className="text-xl">Recruiter</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold"> handle</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Skills Required
                </h3>

                <div className="flex flex-row flex-wrap gap-4">
                  <p className="py-1 text-sm px-2 bg-indigo-200 rounded-full outline-primary text-tx font-semibold ">
                    JavaScript
                  </p>
                  <p className="py-1 text-sm px-2 bg-indigo-200 rounded-full outline-primary text-tx font-semibold ">
                    JavaScript
                  </p>
                  <p className="py-1 text-sm px-2 bg-indigo-200 rounded-full outline-primary text-tx font-semibold ">
                    JavaScript
                  </p>
                  <p className="py-1 text-sm px-2 bg-indigo-200 rounded-full outline-primary text-tx font-semibold ">
                    JavaScript
                  </p>
                </div>
              </div>
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
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleJob;
