import React, { useEffect, useState } from "react";
import { JobCard } from "../../components";
import { useDataContext } from "../../context/useData";

const Jobs = () => {
  const [filterJobs, setFilterJobs] = useState([]);
  const [search, setSearch] = useState("");

  const jobLoad = async () => {
    try {
      const res = await fetch(`/api/v1/jobs/all`);
      const data = await res.json();
      setFilterJobs(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    jobLoad();
  }, []);

  const applyFilter = () => {
    let filterJ = filterJobs.slice();
    if (search.length > 0) {
      filterJ = filterJ.filter((job) =>
        job.job_title.toLowerCase().includes(search.toLowerCase())
      );
    } else {
    }
    setFilterJobs(filterJ);
  };
  useEffect(() => {
    applyFilter();
  }, [search]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-semibold text-center">
          Search and Filter Job Posts
        </h1>
      </div>

      <div className="flex flex-col  md:flex-row-reverse gap-6">
        <div className="flex-1">
          <input
            type="text"
            id="searchBar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for jobs..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-6 flex flex-col gap-4 w-full">
            {filterJobs.map((job, indx) => (
              <JobCard key={indx} job={job} />
            ))}
          </div>
        </div>

        <div className="hidden md:block md:w-[30%] h-[90vh] bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div className="mb-4">
            <label
              htmlFor="job_title"
              className="block text-sm font-medium mb-2"
            >
              Job Title
            </label>
            <input
              type="text"
              id="filter_job_title"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="filter_location"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="min_salary"
                className="block text-sm font-medium mb-2"
              >
                Min Salary
              </label>
              <input
                type="number"
                id="filter_min_salary"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="max_salary"
                className="block text-sm font-medium mb-2"
              >
                Max Salary
              </label>
              <input
                type="number"
                id="filter_max_salary"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="years_exp"
              className="block text-sm font-medium mb-2"
            >
              Years of Experience
            </label>
            <input
              type="number"
              id="filter_years_exp"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="deadline"
              className="block text-sm font-medium mb-2"
            >
              Deadline
            </label>
            <input
              type="date"
              id="filter_deadline"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
