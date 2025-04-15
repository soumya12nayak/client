import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'
import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import StatsSection from "../components/StatsSection";
import FixedWebinarComponent from "../components/FloatingWebinarButton"
import { useEffect, useState } from 'react'
import SkillAssessmentSection from "../components/SkillAssessmentSection";
import CareerRoadmapSection from "../components/CareerRoadmapSection";
import RedirectToInterview from "../components/RedirectToInterview";



const Home = () => {
  const [isPremium, setIsPremium] = useState(false);
      
    useEffect(() => {
      setIsPremium(localStorage.getItem("isPremium") === "true");
    }, []);
  return (
    <div className='bg-home'>
      <Navbar />
      <Hero />
      <JobListing />
      <RedirectToInterview />
      <FixedWebinarComponent isPremium={isPremium} />
      {/* <ChatPopup /> */}<CareerRoadmapSection />
      <SkillAssessmentSection />
      <HowItWorks />
      <Testimonials />
      <AppDownload />
      {/* <WhyChooseUs /> */}
      <StatsSection />
      <Footer />
    </div>
  )
}

export default Home