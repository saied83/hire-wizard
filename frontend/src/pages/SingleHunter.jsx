import React from "react";
import { User, Mail, Phone, Cake, MapPin, Briefcase, Code } from "lucide-react";

const SingleHunter = () => {
  const user = {
    username: "johndoe",
    bio: "Passionate software developer.",
    email: "johndoe@example.com",
    phone_no: "555-1234",
    time_stamp: "2023-09-10T08:32:05.000Z",
    first_name: "John",
    last_name: "Doe",
    dob: "1990-05-14T18:00:00.000Z",
    gender: "Male",
    profile_pic: "https://avatar.iran.liara.run/public/boy?username=johndoe",
    h_city: "New York",
    h_street: "123 Broadway St",
    h_zip_code: "10001",
    h_country: "USA",
    h_working_role: "Software Developer",
    skills: [
      { skill_name: "JavaScript", years_exp: 4 },
      { skill_name: "Python", years_exp: 5 },
    ],
    project: [
      {
        title: "Weather App",
        p_link: "http://example.com/weather",
        p_desc:
          "A weather forecasting application that provides real-time weather updates and 5-day forecasts for any location worldwide.",
        technology: "Python, Flask, React, OpenWeatherMap API",
      },
      {
        title: "Task Manager",
        p_link: "http://example.com/taskmanager",
        p_desc:
          "A productivity tool for managing personal and team tasks with features like deadlines, priorities, and collaboration.",
        technology: "Node.js, Express, MongoDB, React",
      },
    ],
  };

  return (
    <div>
      <div className="min-h-screen hidden md:block py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden">
          <div className="md:flex gap-16 items-center">
            <div className="md:flex-shrink-0">
              <img
                className=" w-full ml-8 object-cover md:w-32 h-auto my-12"
                src={user.profile_pic}
                alt={`${user.first_name} ${user.last_name}`}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {user.h_working_role}
              </div>
              <h2 className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900">
                {user.first_name} {user.last_name}
              </h2>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Username
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.username}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.phone_no}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Cake className="mr-2 h-5 w-5" />
                  Date of Birth
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(user.dob).toLocaleDateString()}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Location
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.h_street}, {user.h_city}, {user.h_zip_code},{" "}
                  {user.h_country}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Skills
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {user.skills.map((skill, index) => (
                      <li
                        key={index}
                        className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                      >
                        <div className="w-0 flex-1 flex items-center">
                          <span className="ml-2 flex-1 w-0 truncate">
                            {skill.skill_name}
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <span className="font-medium text-indigo-600 hover:text-indigo-500">
                            {skill.years_exp} years
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Projects</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {user.project.map((project, index) => (
                      <li
                        key={index}
                        className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                      >
                        <div className="w-0 flex-1 flex items-center">
                          <span className="ml-2 flex-1 w-0 truncate">
                            <strong>{project.title}</strong> - {project.p_desc}
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a
                            href={project.p_link}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            View
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex justify-end mr-8 items-center gap-12  my-8">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-center  py-2 px-4 rounded-full  focus:outline-none focus:shadow-outline block">
              Edit profile
            </button>
            <button className="bg-red-500  hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline block">
              Delete Profile
            </button>
          </div>
        </div>
      </div>

      {/* small devices  */}
      <div className="md:hidden  min-h-screen py-6 flex flex-col  justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
          <div
            className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-60 border border-gray-200 rounded-2xl"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="block relative">
                  <img
                    alt="profile"
                    src={user.profile_pic}
                    className="mx-auto object-cover rounded-full h-24 w-24 "
                  />
                </div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">
                    {user.first_name} {user.last_name}
                  </h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    {user.h_working_role}
                  </p>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <p>{user.bio}</p>
                  <ul className="list-disc space-y-2 flex flex-col gap-4">
                    <li className="flex items-center">
                      <User className="mr-2 h-5 w-5" /> {user.username}
                    </li>
                    <li className="flex items-center">
                      <Mail className="mr-2 h-5 w-5" /> {user.email}
                    </li>
                    <li className="flex items-center">
                      <Phone className="mr-2 h-5 w-5" /> {user.phone_no}
                    </li>
                    <li className="flex items-center">
                      <Cake className="mr-2 h-5 w-5" />{" "}
                      {new Date(user.dob).toLocaleDateString()}
                    </li>
                    <li className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5" /> {user.h_city},{" "}
                      {user.h_country}
                    </li>
                  </ul>
                </div>
                <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                  <p className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" /> Skills
                  </p>
                  <ul className="mt-2 list-disc pl-5 mb-4">
                    {user.skills.map((skill, index) => (
                      <li key={index}>
                        {skill.skill_name} - {skill.years_exp} years
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                  <p className="flex items-center">
                    <Code className="mr-2 h-5 w-5" /> Projects
                  </p>
                  {user.project.map((project, index) => (
                    <div key={index} className="mt-4">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm text-gray-500">{project.p_desc}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        <strong>Technologies:</strong> {project.technology}
                      </p>
                      <a
                        href={project.p_link}
                        className="text-indigo-500 hover:text-indigo-600 text-sm mt-2 inline-block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mr-8 items-center gap-12  mt-8">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-center  py-2 px-4 rounded-full  focus:outline-none focus:shadow-outline block">
                Edit profile
              </button>
              <button className="bg-red-500  hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline block">
                Delete Profile
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHunter;
