import { useState, useEffect } from "react";

const testimonialsData = [
  {
    name: "Sarah Johnson",
    jobTitle: "Software Engineer",
    company: "Google",
    feedback: "This platform made my job search easy and efficient. I landed my dream role within weeks!",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "David Brown",
    jobTitle: "Product Manager",
    company: "Microsoft",
    feedback: "The process was seamless, and I found a perfect match for my skills and experience.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Priya Sharma",
    jobTitle: "UX Designer",
    company: "Adobe",
    feedback: "The intuitive design and job recommendations were spot on. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "John Carter",
    jobTitle: "Data Scientist",
    company: "Amazon",
    feedback: "Fantastic job recommendations tailored to my skillset. I found the right fit in no time.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Emily Davis",
    jobTitle: "Marketing Specialist",
    company: "Spotify",
    feedback: "The platform is user-friendly and helped me connect with top companies fast!",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Ava Martinez",
    jobTitle: "Frontend Developer",
    company: "Netflix",
    feedback: "The job recommendations were spot on! I found a position that matches my passion and skills perfectly.",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    name: "James Lee",
    jobTitle: "Cybersecurity Analyst",
    company: "Cisco",
    feedback: "I appreciated how easy it was to filter jobs by location and salary. It saved me so much time!",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    name: "Sophia Wilson",
    jobTitle: "AI Engineer",
    company: "Tesla",
    feedback: "The platform's recommendations felt personalized, and I landed a role that's both challenging and rewarding.",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    name: "Daniel Kim",
    jobTitle: "Cloud Architect",
    company: "IBM",
    feedback: "It was refreshing to see relevant job suggestions without wading through hundreds of irrelevant listings.",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getPosition = (index) => {
    if (index === currentIndex) return "scale-110 z-10 opacity-100";
    if (
      index === (currentIndex + 1) % testimonialsData.length ||
      (currentIndex === testimonialsData.length - 1 && index === 0)
    )
      return "scale-100 translate-x-[110%] opacity-60 z-0";
    if (
      index === (currentIndex - 1 + testimonialsData.length) % testimonialsData.length ||
      (currentIndex === 0 && index === testimonialsData.length - 1)
    )
      return "scale-100 -translate-x-[110%] opacity-60 z-0";
    return "hidden";
  };

  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <section className="py-10 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#64FFDA] to-[#00C9FF] inline-block text-transparent bg-clip-text tracking-wide">
            What Our Users Say
          </h2>
          <p className="text-gray-300 text-lg mb-6">Real people, real success stories.</p>
        </div>

        {/* Centered 3-Card Carousel */}
        <div className="relative w-full max-w-4xl mx-auto h-[400px] flex justify-center items-center gap-4">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-700 ease-in-out ${getPosition(index)} w-[320px] h-[360px]`}
            >
              <div className="relative bg-gradient-to-br from-[#1E293B] to-[#1C2B3A] shadow-xl rounded-2xl overflow-hidden p-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full border-4 border-[#64FFDA] overflow-hidden mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <p className="italic text-gray-300 text-sm leading-relaxed mb-4">"{testimonial.feedback}"</p>
                <h4 className="font-semibold text-[#64FFDA] text-xl">{testimonial.name}</h4>
                <p className="text-sm text-gray-400">
                  {testimonial.jobTitle} <span className="text-[#00C9FF]">@ {testimonial.company}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
