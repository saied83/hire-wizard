import { MapPin } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobHunterCard = ({ jobHunter }) => {
  const {
    profile_pic,
    h_username,
    first_name,
    last_name,
    h_working_role,
    bio,
    h_city,
    h_country,
  } = jobHunter;
  const navigate = useNavigate();

  const [showFullDes, setShowFullDes] = useState(false);
  let description = bio;
  if (!showFullDes) {
    description = description.substring(0, 90) + "...";
  }
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src={profile_pic}
            alt={first_name + " " + last_name}
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {first_name + " " + last_name}
            </h2>
            <p className="text-gray-600">{h_working_role}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-600 flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {h_city + ", " + h_country}
          </p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">{description}</p>
          <button
            onClick={() => {
              setShowFullDes((prevState) => !prevState);
            }}
            className="text-indigo-500 mb-2 hover:text-indigo-600"
          >
            {showFullDes ? "less" : "More"}
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700">Skills:</h3>
          <div className="flex flex-wrap mt-2">
            {jobHunter.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
              >
                {skill.skill_name}
              </span>
            ))}
          </div>
          <div className="flex justify-end mr-4 my-2">
            <button
              onClick={() => {
                navigate(`/hunters/${h_username}`);
              }}
              className="py-2 px-4 bg-primary rounded-full text-white hover:bg-second hover:text-black"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHunterCard;
