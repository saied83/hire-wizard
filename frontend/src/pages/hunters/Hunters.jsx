import React, { useState, useEffect } from "react";
import { Search, Briefcase, MapPin } from "lucide-react";
import { JobHunterCard } from "../../components";
import { useDataContext } from "../../context/useData";

// Mock data for job hunters

const Hunters = () => {
  const { jobHunters } = useDataContext();
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [filterProfiles, setFilterProfiles] = useState([]);

  const applyFilters = () => {
    let filterProfile = jobHunters.slice();
    if (role.length > 0) {
      filterProfile = filterProfile.filter((profile) =>
        profile.h_working_role.toLowerCase().includes(role.toLowerCase())
      );
    }
    if (location.length > 0) {
      filterProfile = filterProfile.filter((profile) =>
        profile.h_city.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilterProfiles(filterProfile);
  };
  useEffect(() => {
    applyFilters();
  }, [role, location]);

  useEffect(() => {
    setFilterProfiles(jobHunters);
  }, []);

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Hunters</h1>

        <div className="mb-8 bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Filter by role"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Filter by City"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />{" "}
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filterProfiles.map((jobHunter) => (
            <JobHunterCard key={jobHunter.h_username} jobHunter={jobHunter} />
          ))}
        </div>

        {jobHunters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">
              No job hunters found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hunters;
