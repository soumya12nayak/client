import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Membership from './pages/Membership'
import Contact from "./pages/Contact";
import Webinars from "./pages/Webinars";
import Assessment from "./pages/SkillAssessment";
import Quiz from "./components/Quiz";
import Certificate from "./pages/Certificate";
import RoadmapGenerator from "./pages/CareerRoadmap";
import ResumeChoice from './pages/ResumeChoice';
import AISummaryInput from './pages/AISummaryInput';
import AIResumeOutput from './pages/AIResumeOutput';
import ChatPopup from "./components/ChatPopup";
import InterviewPrep from './pages/InterviewPrep';
import InterviewHome from './pages/InterviewHome'
import AboutUs from "./pages/AboutUs";
import CreateWebinar from './pages/CreateWebinar';
import Dashboardweb from './pages/Dashboardweb'


// import QuickLinkPage from './pages/QuickLinkPage';

const App = () => {

  const { showRecruiterLogin, companyToken } = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/webinars" element={<Webinars />} /> {/* ✅ Correct path */}
        <Route path="/create-webinar" element={<CreateWebinar />} />
        <Route path="/dashboard-web" element={<Dashboardweb />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/quiz/:skill" element={<Quiz />} />
        <Route path="/certificate/:skill" element={<Certificate />} />
        <Route path="/roadmap" element={<RoadmapGenerator />} />
        <Route path="/resume" element={<ResumeChoice />} />
        <Route path="/ai-summary" element={<AISummaryInput />} />
        <Route path="/ai-generated-resume" element={<AIResumeOutput />} />
        <Route path="/interview" element={<InterviewPrep />} />
        <Route path="/about" element={<AboutUs />} />
<Route path="/interview-home" element={<InterviewHome />} />
        {/* <Route path="/:linkType" element={<QuickLinkPage />} /> */}
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/dashboard' element={<Dashboard />}>
          {
            companyToken ? <>
              <Route path='add-job' element={<AddJob />} />
              <Route path='manage-jobs' element={<ManageJobs />} />
              <Route path='view-applications' element={<ViewApplications />} />
            </> : null
          }
        </Route>
      </Routes>
      <ChatPopup />
    </div>
  )
}

export default App