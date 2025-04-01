import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const features = [
  {
    title: "Top Companies Hiring",
    description: "Get access to job listings from global industry leaders.",
    icon: "🏢",
  },
  {
    title: "Personalized Job Matches",
    description: "Receive curated jobs based on your skills and preferences.",
    icon: "🎯",
  },
  {
    title: "One-Click Applications",
    description: "Apply quickly without repetitive forms or uploads.",
    icon: "⚡",
  },
  {
    title: "Career Growth Resources",
    description: "Explore resume tips, interview guides, and skill courses.",
    icon: "📘",
  },
];

const WhyChooseUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === features.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
    <section className="py-12 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>

        <div className="relative flex items-center justify-center max-w-4xl mx-auto p-4">
          <FaArrowLeft
            className="text-2xl cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 hover:scale-110 transition"
            onClick={prevSlide}
          />
          <div className="p-8 bg-white text-gray-800 rounded-lg shadow-lg max-w-lg transition-all duration-500">
            <div className="text-5xl mb-4">{features[currentIndex].icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{features[currentIndex].title}</h3>
            <p className="text-gray-600">{features[currentIndex].description}</p>
          </div>
          <FaArrowRight
            className="text-2xl cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 hover:scale-110 transition"
            onClick={nextSlide}
          />
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {features.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default WhyChooseUs;
