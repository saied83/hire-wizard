import React from "react";
import { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [showFullDes, setShowFullDes] = useState(false);

  let description = job.description;
  if (!showFullDes) {
    description = description.substring(0, 90) + "...";
  }
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-2 text-black my-4">
          <h3 className="text-xl font-bold ">{job.job_title}</h3>
        </div>

        <div className="mt-4 text-black">{description}</div>
        <button
          onClick={() => {
            setShowFullDes((prevState) => !prevState);
          }}
          className="text-indigo-500 mb-2 hover:text-indigo-600"
        >
          {showFullDes ? "less" : "More"}
        </button>

        <h3 className="text-indigo-500 mb-2">${job.salary} / Year</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className="inline text-lg mb-1 mr-1" />
            {job.location}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/jobs/${job.job_id}`);
            }}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            View Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
