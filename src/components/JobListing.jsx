import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";
import { useUser } from "@clerk/clerk-react";
 // Import useUser from Clerk

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
  const { isSignedIn } = useUser(); // Check if the user is signed in

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(100000);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const lockedJobIds = [2, 5, 8]; // Example: Lock jobs with these IDs

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((c) => c !== location) : [...prev, location]
    );
  };

  const handleMinSalaryChange = (e) => setMinSalary(Number(e.target.value));
  const handleMaxSalaryChange = (e) => setMaxSalary(Number(e.target.value));

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 || selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocations.length === 0 || selectedLocations.includes(job.location);

    const matchesTitle = (job) =>
      !isSearched || searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      !isSearched || searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const matchesSalary = (job) => job.salary >= minSalary && job.salary <= maxSalary;

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter((job) =>
        matchesCategory(job) &&
        matchesLocation(job) &&
        matchesTitle(job) &&
        matchesSearchLocation(job) &&
        matchesSalary(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter, minSalary, maxSalary]);

  return (
    <div className="container px-4 2xl:px-20 mx-auto my-12">
      <section className="py-10 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#64FFDA] to-[#00C9FF] inline-block text-transparent bg-clip-text tracking-wide">
            Find Your Dream Job
          </h2>
          <p className="text-gray-300 text-lg">Personalized listings tailored just for you.</p>
        </div>

        {/* Toggle Filter Button */}
        <div className="block lg:hidden text-center mb-6">
          <button
            className="px-4 py-2 bg-[#64FFDA] text-[#0F172A] rounded-lg shadow-lg font-semibold hover:bg-[#00C9FF] transition"
            onClick={() => setShowFilter(!showFilter)}
          >
            {showFilter ? "Close Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 px-6">
          {/* Filters Section (Hidden on small screens) */}
          <div
            className={`w-full lg:w-1/4 p-6 bg-[#1C2B3A] rounded-xl shadow-lg transition-transform duration-300 ${showFilter ? "block" : "hidden"
              } lg:block`}
          >
            <h3 className="font-semibold text-xl text-[#64FFDA] mb-4">Filters</h3>

            {/* Search Tags */}
            {isSearched && (searchFilter.title || searchFilter.location) && (
              <div className="mb-4 space-y-2">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-green-50 border border-green-200 px-4 py-1.5 rounded text-black">
                    {searchFilter.title}
                    <img
                      onClick={() => setSearchFilter((prev) => ({ ...prev, title: "" }))}
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt="Remove"
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="inline-flex items-center gap-2.5 bg-pink-50 border border-pink-200 px-4 py-1.5 rounded text-black">
                    {searchFilter.location}
                    <img
                      onClick={() => setSearchFilter((prev) => ({ ...prev, location: "" }))}
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt="Remove"
                    />
                  </span>
                )}
              </div>
            )}

            {/* Categories */}
            <h4 className="text-lg font-medium mb-3">Category</h4>
            <div className="space-y-2">
              {JobCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <label class="toggle-container">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      onChange={() => handleCategoryChange(category)}
                      checked={selectedCategories.includes(category)}
                    />
                    <div class="toggle-checkmark"></div>
                  </label>
                  <span className="text-gray-300">{category}</span>
                </div>
              ))}
            </div>

            {/* Locations */}
            <h4 className="text-lg font-medium mt-6 mb-3">Location</h4>
            <div className="space-y-2">
              {JobLocations.map((location, index) => (
                <div key={index} className="flex items-center gap-2">
                  <label class="toggle-container">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      onChange={() => handleLocationChange(location)}
                      checked={selectedLocations.includes(location)}
                    />
                    <div class="toggle-checkmark"></div>
                  </label>
                  <span className="text-gray-300">{location}</span>
                </div>
              ))}
            </div>

            {/* Salary Range */}
            <h4 className="text-lg font-medium mt-6 mb-3">Salary Range ($)</h4>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="number"
                className="w-1/2 px-3 py-2 rounded bg-[#0F172A] text-white border border-gray-600"
                value={minSalary}
                onChange={handleMinSalaryChange}
                placeholder="Min"
              />
              <span className="text-gray-300">-</span>
              <input
                type="number"
                className="w-1/2 px-3 py-2 rounded bg-[#0F172A] text-white border border-gray-600"
                value={maxSalary}
                onChange={handleMaxSalaryChange}
                placeholder="Max"
              />
            </div>
          </div>

          {/* Job Listings Section */}
          <div className="w-full lg:w-3/4">
            <h3 className="font-semibold text-3xl text-[#64FFDA] mb-4">Available Jobs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                
              <JobCard key={index} job={job} isLocked={lockedJobIds.includes(index)}/>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <button
                onClick={() =>
                  setCurrentPage(Math.max(currentPage - 1, 1))
                }
                className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white flex items-center justify-center hover:bg-gradient-to-l hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 active:scale-95 transition-all duration-300 transform hover:shadow-lg shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </a>

            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
              <a key={index} href="#job-list">
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded 
    ${currentPage === index + 1 ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white" : "text-gray-100"}
    hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-600 hover:text-white 
    transition-all duration-300`}
                >
                  {index + 1}
                </button>

              </a>
            ))}
            <a href="#job-list">
              <button
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))
                }
                className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white flex items-center justify-center hover:bg-gradient-to-l hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 active:scale-95 transition-all duration-300 transform hover:shadow-lg shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </a>



          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
