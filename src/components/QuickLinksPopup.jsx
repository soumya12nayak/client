const QuickLinksPopup = ({ isOpen, onClose, content, title }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 backdrop-blur-md"
      onClick={onClose} // Click outside to close
    >
      <div 
        className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-6 rounded-xl shadow-2xl w-96 relative animate-fadeIn border border-blue-500/30 text-white"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* ✖ Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-2xl font-bold transition-transform hover:rotate-180 duration-300"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-400 tracking-wide drop-shadow-lg">
          {title}
        </h2>

        {/* Content */}
        <p className="text-gray-300 text-lg leading-relaxed text-center font-light">
          {content}
        </p>

        {/* Magical Glow Effect */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-5 right-5 w-10 h-10 bg-purple-500 rounded-full blur-2xl opacity-40"></div>
      </div>
    </div>
  );
};

export default QuickLinksPopup;
