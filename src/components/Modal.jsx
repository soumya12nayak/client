import { createPortal } from "react-dom";
import { FaExclamationTriangle } from "react-icons/fa"; // Warning Icon
import { IoClose } from "react-icons/io5"; // Close Icon
import { MdCancel, MdCheckCircle } from "react-icons/md"; // Cancel & Confirm Icons
import { GiMagicPortal } from "react-icons/gi"; // Sci-Fi Portal Icon

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[99999] animate-fadeIn">
      {/* Outer Glowing Box */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl w-[400px] text-center border border-blue-500 neon-border transform transition-all duration-300 scale-95 hover:scale-100">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition">
          <IoClose className="text-2xl" />
        </button>

        {/* Sci-Fi Header with Icons */}
        <div className="flex flex-col items-center text-blue-400">
          <GiMagicPortal className="text-5xl animate-pulse mb-2" />
          <h2 className="text-2xl font-bold text-white tracking-wider">Premium Access Disengaging...</h2>
        </div>

        {/* Sci-Fi Warning Message */}
        <p className="text-gray-300 mt-3 text-sm leading-relaxed">
          <FaExclamationTriangle className="inline text-yellow-400 text-lg mr-1" />  
          Warning: This action will **disconnect** your premium privileges and revert your account to standard mode.  
          <span className="block text-blue-300 mt-2">Premium benefits will be lost. Are you sure you want to proceed?</span>
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-lg transition-all duration-300 shadow-md hover:shadow-blue-500/50 border border-red-700"
          >
            <MdCancel className="text-lg animate-pulse" /> Confirm Disconnect
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-lg transition-all duration-300 shadow-md hover:shadow-green-500/50 border border-green-700"
          >
            <MdCheckCircle className="text-lg" /> Keep Premium
          </button>
        </div>

        {/* Footer Tech Glow */}
        <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-40 h-1 bg-blue-500 rounded-full blur-md"></div>

      </div>
    </div>,
    document.body
  );
};

export default Modal;
