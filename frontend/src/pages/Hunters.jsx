import React, { useState, useEffect } from "react";
import { Search, Briefcase, MapPin } from "lucide-react";

// Mock data for job hunters
const initialJobHunters = [
  {
    id: 1,
    name: "John Doe",
    role: "Full Stack Developer",
    location: "New York, USA",
    skills: ["React", "Node.js", "Python"],
    experience: 5,
    bio: "Passionate about creating scalable web applications",
    avatar: "https://avatar.iran.liara.run/public/boy?username=johndoe",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "UX Designer",
    location: "San Francisco, USA",
    skills: ["Figma", "Sketch", "User Research"],
    experience: 3,
    bio: "Creating intuitive and beautiful user experiences",
    avatar: "https://avatar.iran.liara.run/public/girl?username=janesmith",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Data Scientist",
    location: "London, UK",
    skills: ["Python", "Machine Learning", "SQL"],
    experience: 7,
    bio: "Turning data into actionable insights",
    avatar: "https://avatar.iran.liara.run/public/boy?username=mikejohnson",
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Frontend Developer",
    location: "Berlin, Germany",
    skills: ["React", "Vue.js", "CSS"],
    experience: 4,
    bio: "Crafting pixel-perfect user interfaces",
    avatar: "https://avatar.iran.liara.run/public/girl?username=emilybrown",
  },
  {
    id: 5,
    name: "Alex Lee",
    role: "DevOps Engineer",
    location: "Toronto, Canada",
    skills: ["Docker", "Kubernetes", "AWS"],
    experience: 6,
    bio: "Automating and optimizing development workflows",
    avatar: "https://avatar.iran.liara.run/public/boy?username=alexlee",
  },
];

const JobHunterCard = ({ jobHunter }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="p-4">
      <div className="flex items-center">
        <img
          className="h-16 w-16 rounded-full object-cover"
          src={jobHunter.avatar}
          alt={jobHunter.name}
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {jobHunter.name}
          </h2>
          <p className="text-gray-600">{jobHunter.role}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-600 flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          {jobHunter.location}
        </p>
        <p className="text-gray-600 flex items-center mt-2">
          <Briefcase className="h-4 w-4 mr-2" />
          {jobHunter.experience} years of experience
        </p>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">{jobHunter.bio}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-700">Skills:</h3>
        <div className="flex flex-wrap mt-2">
          {jobHunter.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Hunters = () => {
  const [jobHunters, setJobHunters] = useState(initialJobHunters);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterExperience, setFilterExperience] = useState("");

  useEffect(() => {
    const filteredHunters = initialJobHunters.filter((hunter) => {
      const matchesSearch =
        hunter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hunter.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesRole =
        filterRole === "" ||
        hunter.role.toLowerCase().includes(filterRole.toLowerCase());
      const matchesLocation =
        filterLocation === "" ||
        hunter.location.toLowerCase().includes(filterLocation.toLowerCase());
      const matchesExperience =
        filterExperience === "" ||
        hunter.experience >= parseInt(filterExperience);

      return (
        matchesSearch && matchesRole && matchesLocation && matchesExperience
      );
    });

    setJobHunters(filteredHunters);
  }, [searchTerm, filterRole, filterLocation, filterExperience]);

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Hunters</h1>

        <div className="mb-8 bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or skill"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Filter by role"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter by location"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            />
            <input
              type="number"
              placeholder="Min years of experience"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobHunters.map((jobHunter) => (
            <JobHunterCard key={jobHunter.id} jobHunter={jobHunter} />
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
