import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(false);

  const { backendUrl, companyToken } = useContext(AppContext);

  // Fetch company jobs
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Change job visibility
  const changeJobVisiblity = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-visiblity`,
        { id },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  return jobs ? (
    jobs.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No Jobs Available or posted</p>
      </div>
    ) : (
      <div className="container p-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">📌 Manage Your Jobs</h1>

        <div className="grid gap-4">
          {jobs.map((job, index) => (
            <div
              key={job._id}
              className="p-5 bg-gradient-to-br from-[#f8f9fa] to-[#ffffff] shadow-xl rounded-xl backdrop-blur-md border border-gray-200 flex justify-between items-center hover:scale-[1.02] transition-transform duration-200 hover:shadow-2xl"
            >
              {/* Job Info */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <h2 className="text-lg font-semibold text-gray-700 tracking-wide">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-500 hidden sm:block">
                  📍 {moment(job.date).format('ll')} | {job.location}
                </p>
                <span className="text-blue-600 font-medium text-sm sm:hidden">
                  🧑‍💼 {job.applicants} Applicants
                </span>
              </div>

              {/* Right Side Controls */}
              <div className="flex gap-6 items-center">
                <span className="text-sm text-gray-600 hidden sm:block">
                  👥 <b className="text-blue-500">{job.applicants}</b> Applicants
                </span>

                {/* Visibility Toggle Switch */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={() => changeJobVisiblity(job._id)}
                    type="checkbox"
                    checked={job.visible}
                    className="hidden"
                  />
                  <div
                    className={`w-12 h-6 rounded-full ${
                      job.visible ? 'bg-green-500' : 'bg-gray-300'
                    } transition duration-300 ease-in-out shadow-inner`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-white shadow-md transform ${
                        job.visible ? 'translate-x-6' : ''
                      } transition duration-300`}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {job.visible ? '✅ Visible' : '❌ Hidden'}
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate('/dashboard/add-job')}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-6 rounded-full transition shadow-lg transform hover:-translate-y-1"
          >
            ➕ Add New Job
          </button>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ManageJobs;
