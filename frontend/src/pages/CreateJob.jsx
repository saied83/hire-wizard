import React from "react";

// "apply_limit": 5,
// "skills": [
//     "JavaScript",
//     "Python"
// ]

const CreateJob = () => {
  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Add Job
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Job Title Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Beautiful Apartment In Miami"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
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
              <div className="mb-4">
                <div className="flex flex-row flex-wrap gap-4">
                  <div className="w-[50%]">
                    <label
                      htmlFor="type"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Salary/Year
                    </label>
                    <input
                      type="number"
                      className="border rounded w-full py-2 px-3 mb-2"
                      required
                      placeholder="$80000"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 font-bold mb-2">
                      Apply Limit
                    </label>
                    <input
                      type="number"
                      name="limit"
                      placeholder="50"
                      className="border rounded w-full py-2 px-3 mb-2"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Company Location"
                  required
                />
              </div>
              <div className="mb-4">
                <div className="flex flex-row flex-wrap gap-4">
                  <div className="w-[50%]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Years Experience
                    </label>
                    <input
                      type="number"
                      id="year_exp"
                      name="year_exp"
                      className="border rounded w-full py-2 px-3 mb-2"
                      placeholder="3 Years"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 font-bold mb-2">
                      Deadline
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="deadline"
                      className="border rounded w-full py-2 px-3 mb-2"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Skills
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="javascript, python, c#"
                  required
                />
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
        </div>
      </section>
    </>
  );
};

export default CreateJob;
