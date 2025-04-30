import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/clerk-react'
import SalaryInsights from "../components/SalaryInsights";
import { useUser } from "@clerk/clerk-react";


const ApplyJob = () => {

  const { id } = useParams()

  const { getToken } = useAuth()

  const navigate = useNavigate()
  const { user } = useUser();

  const [JobData, setJobData] = useState(null)
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)
  const [isPremium, setIsPremium] = useState(false);


  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext)



  useEffect(() => {
    setIsPremium(localStorage.getItem("isPremium") === "true");
  }, []);

  const fetchJob = async () => {

    try {

      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)

      if (data.success) {
        setJobData(data.job)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const applyHandler = async () => {
    try {

      if (!userData) {
        return toast.error('Login to apply for jobs')
      }

      if (!userData.resume) {
        navigate('/applications')
        return toast.error('Upload resume to apply')
      }

      const token = await getToken()

      const { data } = await axios.post(backendUrl + '/api/users/apply',
        { jobId: JobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchUserApplications()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(
      (item) => item?.jobId?._id === JobData?._id
    );
    setIsAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    fetchJob()
  }, [id])

  useEffect(() => {
    if (userApplications.length > 0 && JobData) {
      checkAlreadyApplied()
    }
  }, [JobData, userApplications, id])

  return JobData ? (
    <>
      <Navbar />

      <div className="bg-home min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div
          className="relative text-white rounded-xl shadow-2xl overflow-hidden border border-cyan-400/50"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.15), transparent), url('https://www.transparenttextures.com/patterns/stardust.png'), linear-gradient(135deg, #080d16, #000)",
            boxShadow: "0 0 30px rgba(0, 255, 255, 0.2)",
          }}
        >
          {/* Soft Nebula Glow (Now behind content) */}
          <div className="absolute inset-0 bg-cyan-400/10 backdrop-blur-[5px] rounded-xl -z-10"></div>


          {/* Job Header Section */}
          <div className="flex justify-center md:justify-between flex-wrap gap-8 p-8 mb-6 bg-gradient-to-r from-cyan-700 via-purple-800 to-indigo-900 border border-cyan-300/50 rounded-t-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-28 bg-white rounded-lg p-4 mr-4 max-md:mb-4 shadow-md border border-cyan-500/50"
                src={JobData.companyId.image}
                alt="Company Logo"
              />
              <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-cyan-400">{JobData.title}</h1>
                <div className="flex flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-300 mt-3">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="Job Icon" />
                    {JobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="Location Icon" />
                    {JobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="Person Icon" />
                    {JobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="Salary Icon" />
                    💸 CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">

              <button
                onClick={() => {
                  if (!userData) return toast.error("Login to apply for jobs");
                  if (isAlreadyApplied) return;
                  applyHandler();
                }}
                disabled={isAlreadyApplied || !userData}
                className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"></span>

                <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"></span>

                <div className="relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#f27121] via-[#e94057] to-[#8a2387] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
                  <span className="select-none">
                    {isAlreadyApplied
                      ? "✅ Already Applied"
                      : !userData
                        ? "🔒 Login to Apply"
                        : "🚀 Apply Now"}
                  </span>

                  {!isAlreadyApplied && (
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      />
                    </svg>
                  )}
                </div>
              </button>


              <p className="mt-1 text-gray-400 italic">Posted {moment(JobData.date).fromNow()}</p>
            </div>
          </div>

          <div className="p-6 lg:flex gap-10">
            {/* Left Section - Job Description */}
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-3xl text-cyan-400 mb-4">📌 Job Description</h2>
              <div className="rich-text leading-relaxed text-gray-300" dangerouslySetInnerHTML={{ __html: JobData.description }}></div>

              {/* Apply Button Below Description */}
              <button
                className={`relative inline-flex items-center justify-center gap-4 group mt-5 ${isAlreadyApplied ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={applyHandler}
                disabled={isAlreadyApplied}
              >
                <div
                  className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
                ></div>
                <span
                  className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                >
                  {isAlreadyApplied ? "✅ Already Applied" : "🚀 Apply Now"}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 10 10"
                    height="10"
                    width="10"
                    fill="none"
                    className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                  >
                    <path
                      d="M0 5h7"
                      className="transition opacity-0 group-hover:opacity-100"
                    ></path>
                    <path
                      d="M1 1l4 4-4 4"
                      className="transition group-hover:translate-x-[3px]"
                    ></path>
                  </svg>
                </span>
              </button>

              {/* Why Join Us? Section */}
              <div className="mt-10 p-6 bg-gradient-to-r from-indigo-900 via-purple-800 to-black rounded-lg shadow-lg border border-indigo-500/50">


                {/* Recruiter Contact Section */}
                <div className="mt-6 p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg shadow-lg border border-indigo-500/50">
                  <h2 className="text-2xl font-bold mb-4 text-cyan-300">📧 Contact Recruiter</h2>

                  {/* Conditionally show contact details if user is logged in */}
                  {user ? (
                    !isPremium ? (
                      // If the user is NOT premium, show the locked message
                      <div className="flex flex-col items-center text-center">
                        <p className="text-gray-400">🔒 Unlock premium membership to access direct recruiter details.</p>
                        <button
                          onClick={() => navigate('/membership')}
                          className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-2 px-6 rounded-full shadow-md hover:scale-105 transition-all"
                        >
                          🚀 Unlock Now
                        </button>
                      </div>
                    ) : (
                      // If the user is premium, show the recruiter contact info
                      <>
                        <p className="text-gray-300">Have questions about the job? Reach out to the recruiter.</p>
                        <div className="mt-4 flex items-center gap-4">
                          <input
                            type="text"
                            value={JobData.companyId.email}
                            readOnly
                            className="w-full bg-gray-900 text-gray-300 px-4 py-2 rounded-md border border-gray-700 focus:outline-none"
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(JobData.companyId.email);
                              toast.success("Recruiter email copied!");
                            }}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all"
                          >
                            📋 Copy
                          </button>
                        </div>
                        <a
                          href={`mailto:${JobData.companyId.email}`}
                          className="mt-3 block text-cyan-400 hover:underline"
                        >
                          ✉️ Send Email
                        </a>
                      </>
                    )
                  ) : (
                    <p className="text-gray-400">Please log in to access recruiter contact details.</p> // Message for logged-out users
                  )}
                </div>



                {/* Salary Insights Section */}
{user ? (
  isPremium ? (
    <SalaryInsights
      salaryData={jobs.filter(job => job.category === JobData.category)}
      isPremium={userData?.isPremium}
    />
  ) : (
    <div className="mt-6 p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg shadow-lg border border-indigo-500/50">
      <p className="text-gray-400">🔒 Unlock premium membership to view detailed salary insights.</p>
      <button
        onClick={() => navigate('/membership')}
        className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-2 px-6 rounded-full shadow-md hover:scale-105 transition-all"
      >
        🚀 Unlock Now
      </button>
    </div>
  )
) : (
  <div className="mt-6 p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg shadow-lg border border-indigo-500/50">
                  <h2 className="text-2xl font-bold mb-4 text-yellow-300">💰📊 Salary Insights</h2>
  <p className="text-gray-400">Please log in to access salary insights.</p></div>
)}


              </div>
            </div>




            {/* Right Section - More Jobs from Company */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 space-y-5 bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-xl shadow-md p-5 border border-cyan-300/40">
              <h2 className="text-xl font-semibold text-cyan-400 border-b border-cyan-500 pb-2">
                🔍 More jobs from <span className="text-indigo-400">{JobData.companyId.name}</span>
              </h2>
              {jobs
                .filter((job) => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
                .filter((job) => {
                  const appliedJobsIds = new Set(userApplications.map((app) => app.jobId && app.jobId._id));
                  return !appliedJobsIds.has(job._id);
                })
                .slice(0, 4)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
          </div>

        </div>
      </div>


      <Footer />
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob

