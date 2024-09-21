import React, { useEffect, useState } from "react";
import { User, Briefcase, Plus, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const CreateHunter = () => {
  const { username } = useParams();
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    username: "",
    h_zip: "",
    h_street: "",
    h_city: "",
    h_country: "",
    h_working_role: "",
    skills: [],
    projects: [],
  });

  const handleHunter = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/hunters/single/${username}`);
      const data = await res.json();
      const {
        h_username,
        h_city,
        h_street,
        h_zip_code,
        h_working_role,
        skills,
        project,
      } = data.data;
      setProfile((prev) => ({
        ...prev,
        username: h_username,
        h_city: h_city || "",
        h_street: h_street || "",
        h_zip: h_zip_code || "",
        h_working_role: h_working_role || "",
        skills: skills || [],
        projects: project || [],
      }));
    } catch (error) {
      console.log("Error in parsing hunter data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleHunter();
  }, []);

  const [newSkill, setNewSkill] = useState({ skill_name: "", years_exp: 1 });
  const [newProject, setNewProject] = useState({
    title: "",
    p_link: "",
    p_desc: "",
    technology: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const addSkills = (e) => {
    e.preventDefault();
    const existSkill = profile.skills.map((skill) => skill.skill_name);

    if (existSkill.includes(newSkill.skill_name)) {
      toast.error("skill already exists!");
    } else {
      const allSkills = profile.skills.slice();
      allSkills.push(newSkill);
      setProfile((prev) => ({ ...prev, skills: allSkills }));
      setNewSkill({ skill_name: "", years_exp: 1 });
    }
  };

  const addProject = (e) => {
    const allProjects = profile.projects.slice();
    allProjects.push(newProject);
    setProfile((prev) => ({ ...prev, projects: allProjects }));
    setNewProject({
      title: "",
      p_link: "",
      p_desc: "",
      technology: "",
    });
  };

  const deleteSkill = (e, s) => {
    e.preventDefault();
    const filterSkill = profile.skills.filter((skill) => skill.skill_name != s);

    setProfile((prev) => ({ ...prev, skills: filterSkill }));
  };

  const deleteProject = (e, p) => {
    e.preventDefault();
    const filterProject = profile.skills.filter((project) => skill.title != n);
    setProfile((prev) => ({ ...prev, projects: filterProject }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/v1/hunters/add/${username}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: profile.username,
          h_city: profile.h_city,
          h_street: profile.h_street,
          h_zip_code: profile.h_zip,
          h_country: profile.h_country,
          h_working_role: profile.h_working_role,
          skills: profile.skills,
          projects: profile.projects,
        }),
      });

      toast.success("Hunter user created successfully!");
      navigate(`/hunters/${username}`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {authUser.username === username ? (
        <div className="min-h-screen md:w-full py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3  md:w-[70%] sm:mx-auto w-full px-4 sm:px-0">
            <div
              className="relative  px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-60 border border-gray-200"
              style={{ backdropFilter: "blur(20px)" }}
            >
              <h1 className="text-2xl font-bold mb-8 text-center">
                Create Your Job Hunter Profile
              </h1>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={username}
                      disabled
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-10"
                      placeholder="johndoe"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="h_city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="h_city"
                      name="h_city"
                      value={profile.h_city}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-4"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="h_street"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street
                    </label>
                    <input
                      type="text"
                      id="h_street"
                      name="h_street"
                      value={profile.h_street}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-4"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="h_country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="h_country"
                      name="h_country"
                      value={profile.h_country}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-4"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="h_zip"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Zip Code
                    </label>
                    <input
                      type="number"
                      id="h_zip"
                      name="h_zip"
                      value={profile.h_zip}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-4"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="h_working_role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Role
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="h_working_role"
                      name="h_working_role"
                      value={profile.h_working_role}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-10"
                      placeholder="Software Developer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Skills
                  </label>
                  <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Skill name"
                      name="skill_name"
                      value={newSkill.skill_name}
                      onChange={(e) =>
                        setNewSkill((prev) => ({
                          ...prev,
                          skill_name: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-4"
                    />
                    <div className="flex items-center">
                      <input
                        type="number"
                        placeholder="Years"
                        name="years_exp"
                        min={1}
                        value={newSkill.years_exp}
                        onChange={(e) =>
                          setNewSkill((prev) => ({
                            ...prev,
                            years_exp: e.target.value,
                          }))
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-4"
                      />
                      <button
                        type="button"
                        onClick={(e) => addSkills(e)}
                        className="inline-flex items-center px-3 py-[10px] border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 space-y-2">
                    {profile.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-gray-100 p-2 rounded"
                      >
                        <span>
                          {skill.skill_name} - {skill.years_exp} years
                        </span>
                        <button
                          onClick={(e) => deleteSkill(e, skill.skill_name)}
                          type="button"
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Projects
                  </label>
                  <div className="mt-2 space-y-2">
                    <input
                      type="text"
                      placeholder="Project title"
                      name="title"
                      value={newProject.title}
                      onChange={(e) =>
                        setNewProject((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-4"
                    />
                    <input
                      type="url"
                      placeholder="Project link"
                      name="p_link"
                      value={newProject.p_link}
                      onChange={(e) =>
                        setNewProject((prev) => ({
                          ...prev,
                          p_link: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-4"
                    />
                    <textarea
                      placeholder="Project description"
                      name="p_desc"
                      value={newProject.p_desc}
                      onChange={(e) =>
                        setNewProject((prev) => ({
                          ...prev,
                          p_desc: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-4"
                      rows="2"
                    ></textarea>
                    <input
                      type="text"
                      placeholder="Technologies used"
                      name="technology"
                      value={newProject.technology}
                      onChange={(e) =>
                        setNewProject((prev) => ({
                          ...prev,
                          technology: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-4"
                    />
                    <button
                      type="button"
                      onClick={addProject}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Project
                    </button>
                  </div>
                  <div className="mt-2 space-y-2">
                    {profile.projects.map((project, index) => (
                      <div key={index} className="bg-gray-100 p-2 rounded">
                        <div className="flex justify-between items-center">
                          <strong>{project.title}</strong>
                          <button
                            type="button"
                            onClick={(e) => deleteProject(e, project.title)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm">{project.p_desc}</p>
                        <p className="text-sm text-gray-500">
                          Technologies: {project.technology}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>{navigate(`/hunters/${authUser.username}`)}</>
      )}
    </>
  );
};

export default CreateHunter;
