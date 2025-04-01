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


const ApplyJob = () => {

  const { id } = useParams()

  const { getToken } = useAuth()

  const navigate = useNavigate()

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
                className="h-28 bg-black rounded-lg p-4 mr-4 max-md:mb-4 shadow-md border border-cyan-500/50"
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
                className={`apply-btn bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-105 hover:shadow-cyan-400/40 transition-all duration-300 text-white font-bold py-3 px-8 rounded-full shadow-md border border-cyan-300/40 ${isAlreadyApplied ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={applyHandler}
                disabled={isAlreadyApplied}
              >
                {isAlreadyApplied ? "✅ Already Applied" : "🚀 Apply Now"}
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
                className={`apply-btn mt-5 bg-gradient-to-r from-green-500 to-teal-400 hover:scale-105 transition-transform duration-200 ease-in-out text-white font-bold py-3 px-8 rounded-full shadow-md border border-teal-300/50 ${isAlreadyApplied ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={applyHandler}
                disabled={isAlreadyApplied}
              >
                {isAlreadyApplied ? "✅ Already Applied" : "🚀 Apply Now"}
              </button>

              {/* Why Join Us? Section */}
              <div className="mt-10 p-6 bg-gradient-to-r from-indigo-900 via-purple-800 to-black rounded-lg shadow-lg border border-indigo-500/50">
                

                {/* Recruiter Contact Section (Locked for Non-Premium Users) */}
                <div className="mt-6 p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-lg shadow-lg border border-indigo-500/50">
                  <h2 className="text-2xl font-bold mb-4 text-cyan-300">📧 Contact Recruiter</h2>

                  {!isPremium ? (
                    // If user is premium, show email
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
                    // If user is NOT premium, show locked message

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
                  )}
                </div>

                
                <SalaryInsights salaryData={jobs.filter(job => job.category === JobData.category)} isPremium={userData?.isPremium} />

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

