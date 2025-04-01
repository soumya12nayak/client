import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext)
  const [applicants, setApplicants] = useState(false)

  // Fetch Job Applications
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      })

      if (data.success) {
        setApplicants(data.applications.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Update Job Application Status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id, status },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        setApplicants((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status } : app))
        )
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) fetchCompanyJobApplications()
  }, [companyToken])

  // 📌 Loading & No Applications UI
  if (!applicants) return <Loading />
  if (applicants.length === 0)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No Applications Available</p>
      </div>
    )

  // ✅ Modern UI for Applications Table
  return (
    <div className="container mx-auto p-4">
      <div className="shadow-lg rounded-lg overflow-hidden">
        <table className="w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead className="bg-gradient-to-r from-gray-800 to-gray-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">User Name</th>
              <th className="py-3 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-3 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-3 px-4 text-left">Resume</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {applicants
              .filter((applicant) => applicant.jobId && applicant.userId)
              .map((applicant, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-all">
                  <td className="py-3 px-4 text-center font-medium">{index + 1}</td>

                  {/* User info with avatar */}
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                      src={applicant.userId.image}
                      alt="User avatar"
                    />
                    <span className="font-semibold text-gray-700">{applicant.userId.name}</span>
                  </td>

                  <td className="py-3 px-4 max-sm:hidden text-gray-600">{applicant.jobId.title}</td>
                  <td className="py-3 px-4 max-sm:hidden text-gray-600">{applicant.jobId.location}</td>

                  {/* Resume download button */}
                  <td className="py-3 px-4">
                    <a
                      href={applicant.userId.resume}
                      target="_blank"
                      className="bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex gap-2 items-center hover:bg-blue-100 transition-all"
                    >
                      Resume <img src={assets.resume_download_icon} alt="Download icon" />
                    </a>
                  </td>

                  {/* ✅ Status with instant action buttons */}
                  <td className="py-3 px-4 text-center">
                    {applicant.status === 'Pending' ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')}
                          className="bg-green-100 text-green-600 hover:bg-green-200 px-3 py-1 rounded text-sm transition-all"
                        >
                          ✅ Accept
                        </button>
                        <button
                          onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')}
                          className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded text-sm transition-all"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`py-1 px-2 rounded text-sm font-semibold ${
                          applicant.status === 'Accepted'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {applicant.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications
