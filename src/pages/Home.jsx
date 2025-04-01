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
      <FixedWebinarComponent isPremium={isPremium} />
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