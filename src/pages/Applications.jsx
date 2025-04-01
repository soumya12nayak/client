import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import ApplicationTimeline from "../components/ApplicationTimeline";
import ResponseTimeIndicator from "../components/ResponseTimeIndicator";
import RatingComponent from "../components/RatingComponent";
import InterviewBadge from "../components/InterviewBadge";

const Applications = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const [ratings, setRatings] = useState({});

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext);

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("companyRatings")) || {};
    setRatings(savedRatings);
  }, []);

  const handleRating = (companyId, rating) => {
    const newRatings = { ...ratings, [companyId]: rating };
    setRatings(newRatings);
    localStorage.setItem("companyRatings", JSON.stringify(newRatings));
  };

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/users/update-resume",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  return userData ? (
    <>
      <Navbar />
      <div className="container min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-10 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide text-[#e0aaff]">
            Your Applications 🚀
          </h1>

          {/* Resume Upload Section */}
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-xl font-semibold text-[#ffaf7b] mb-3">Your Resume</h2>
            <div className="flex gap-4">
            {
            isEdit || userData && userData.resume === ""
              ? <>
                <label className='flex items-center' htmlFor="resumeUpload">
                  <button className="bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group mr-2">
                    <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
                    {resume ? resume.name : "Select Resume"}
                  </button>
                  <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                  <img src={assets.profile_upload_icon} alt="" />
                </label>
                <button onClick={updateResume} title="Save" className="cursor-pointer flex items-center fill-lime-400 bg-lime-950 hover:bg-lime-900 active:border active:border-lime-400 rounded-md duration-100 p-2">
                  <svg viewBox="0 -0.5 25 25" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z" clipRule="evenodd" fillRule="evenodd" />
                  </svg>
                  <span className="text-sm text-lime-400 font-bold pr-1">Save</span>
                </button>
              </>
              :
              <div className='flex gap-2'>
                <a target='_blank' href={userData.resume}>
                  <button className="resume">
                    <span className="fold" />
                    <div className="points_wrapper">
                      <i className="point" />
                      <i className="point" />
                      <i className="point" />
                      <i className="point" />
                      <i className="point" />
                      <i className="point" />
                      <i className="point" />
                      <i className="point" />
                      <i className="point" />
                      <i className="point" />
                    </div>
                    <span className="inner"><svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
                      <polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37" /></svg>Resume</span>
                  </button>
                </a>
                <button onClick={() => setIsEdit(true)} className="edit">Edit
                  <svg className="svg" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" /></svg>
                </button>
              </div>
          }
            </div>
          </div>

          {/* Jobs Applied Section */}
          <h2 className="text-2xl font-semibold text-center text-[#8ac6d1] mb-6">Jobs You've Applied For 💼</h2>

          {/* Job Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userApplications?.map((job, index) =>
              job?.companyId && job?.jobId ? (
                <div
                  key={index}
                  className="p-6 bg-white/10 backdrop-blur-md shadow-lg border border-white/20 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Job Details */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      className="w-16 h-15 object-cover rounded-full border-2 border-white/30"
                      src={job.companyId?.image || assets.default_company_icon}
                      alt="Company Logo"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-[#e0aaff]">{job.jobId?.title || "Unknown Title"}</h3>
                      <p className="text-sm text-white/70">{job.companyId?.name || "Unknown Company"}</p>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm mb-2">
                    📍 {job.jobId?.location || "Unknown Location"} — 🗓 {moment(job.date).format("ll")}
                  </p>

                  {/* Status Badge */}
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      job.status === "✅ Accepted"
                        ? "bg-green-500/30 text-green-300"
                        : job.status === "❌ Rejected"
                        ? "bg-red-500/30 text-red-300"
                        : "bg-blue-500/30 text-blue-300"
                    }`}
                  >
                    {job.status}
                  </span>

                  {/* Extra components */}
                  <InterviewBadge job={job} />
                  <ApplicationTimeline status={job.status} />
                  <ResponseTimeIndicator appliedDate={job.date} />

                  {/* Ratings */}
                  {job.status?.includes("Accepted") && job.companyId?._id ? (
                    <div className="mt-4">
                      <RatingComponent companyId={job.companyId._id} />
                    </div>
                  ) : (
                    <span className="text-white/40 mt-3 block">No rating available</span>
                  )}
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Applications;
