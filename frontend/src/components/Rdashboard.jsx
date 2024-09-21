import React, { useEffect, useState } from "react";
import { useDataContext } from "../context/useData";
import { useAuthContext } from "../context/AuthContext";
const Rdashboard = ({ user }) => {
  const { jobs } = useDataContext();
  const { authUser } = useAuthContext();
  const [job, setJob] = useState([]);

  useEffect(() => {
    let allJobs = jobs;
    allJobs = allJobs.filter((j) => j.r_username === user);
    setJob(allJobs);
  }, []);
  console.log(job);
  return (
    <div>
      {job.map((j, indx) => (
        <div
          key={indx}
          className="w-full my-4 bg-ty border-b border-gray-300 border-dotted h-[200px] rounded-lg"
        >
          <div className="w-full h-full flex justify-between ">
            <div className="my-8 ml-12 text-center">
              <p className="text-2xl bg-second py-4 px-8 rounded-lg text-blue-700 font-semibold">
                Title: <span>{j.job_title}</span>
              </p>
              <p className="text-xl font-black bg-ty py-4 px-6 rounded-sm ">
                Total Applicant:{" "}
                <span className="text-red-700 ml-2 text-2xl">
                  {" "}
                  {j.applicant.length}
                </span>
              </p>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rdashboard;
