import { useContext, useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import MembershipButton from "./MembershipButton";
import "../styles/global.css";
import { toast } from "react-toastify";
import DropdownPortal from "../components/DropdownPortal";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const navigate = useNavigate();
    const { setShowRecruiterLogin } = useContext(AppContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const { isSignedIn } = useUser();
    const btnRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);


    // Separate references for Highlight and Prep buttons
    const highlightBtnRef = useRef(null);
    const prepBtnRef = useRef(null);

    const timeoutRef = useRef(null);

    // Separate visibility states for each dropdown
    const [isHighlightVisible, setIsHighlightVisible] = useState(false);
    const [isPrepVisible, setIsPrepVisible] = useState(false);

    const handleEnter = (setVisibility) => {
        clearTimeout(timeoutRef.current);
        setVisibility(true);
    };

    const handleLeave = (setVisibility) => {
        timeoutRef.current = setTimeout(() => {
            setVisibility(false);
        }, 200); // 200ms delay to allow cursor movement
    };

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current); // cleanup
    }, []);


    const handleResumeClick = () => {
        if (!isSignedIn) {
            toast.warning("Please log in to access this feature.");
            return;
        }

        // User is logged in but not premium
        navigate("/membership");
    }


    const handleProtectedNav = (path) => {
        if (!isSignedIn) {
            toast.warning("Please log in to access this feature.");
            return;
        }
        navigate(path);
    };

    // const handleProtectedNa = (path) => {
    //     if (!isSignedIn) {
    //         toast.warning("Please log in as Recruiter to access this feature.");
    //         return;
    //     }
    //     navigate(path);
    // };

    const [isPremium, setIsPremium] = useState(
        localStorage.getItem("isPremium") === "true"
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setIsPremium(localStorage.getItem("isPremium") === "true");
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <nav className="navbar-bg bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg p-3">
            <div className="container mx-3 px-4 lg:px-11 flex justify-between items-center">
                {/* Logo */}
                <img
                    onClick={() => navigate("/")}
                    className="cursor-pointer h-10 w-auto hover:scale-105 transition-transform duration-300"
                    src={assets.logo}
                    alt="Job Portal Logo"
                />

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>

                {/* Navigation Links (Desktop) */}
                <div className="hidden lg:flex items-center gap-5">

                    <Link
                        to="/about"
                        className="smky-btn3 relative hover:text-[#ffffff] py-1 px-2 text-[10px] md:text-xs after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#1b07f6] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white"
                    >
                        About Us
                    </Link>


                    {/* Highlight Dropdown */}
                    <>
                        <div
                            ref={highlightBtnRef}
                            onMouseEnter={() => handleEnter(setIsHighlightVisible)}
                            onMouseLeave={() => handleLeave(setIsHighlightVisible)}
                            className="cursor-pointer smky-btn3 relative hover:text-[#ffffff] py-1 px-2 text-[10px] md:text-xs after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#1b07f6] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white"
                        >
                            Highlight
                        </div>


                        {/* Portal Dropdown */}
                        <AnimatePresence>
                            {isHighlightVisible && (
                                <DropdownPortal anchorRef={highlightBtnRef} visible={true}>
                                    <motion.div
                                        onMouseEnter={() => handleEnter(setIsHighlightVisible)}
                                        onMouseLeave={() => handleLeave(setIsHighlightVisible)}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                    >
                                        <ul className="space-y-2">
                                            <li>
                                                <a
                                                    href="/membership"
                                                    className="block px-4 py-2 text-sm text-white rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-green-400 to-teal-500"
                                                >
                                                    Premium Membership
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/ai-summary"
                                                    className="block px-4 py-2 text-sm text-white rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-green-400 to-teal-500"
                                                >
                                                    AI Resume Generator
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="https://career-genie-resume-client.vercel.app"
                                                    className="block px-4 py-2 text-sm text-white rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-green-400 to-teal-500"
                                                >
                                                    Resume Generator (Manually)
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/roadmap"
                                                    className="block px-3 py-2 text-sm text-white rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-green-400 to-teal-500"
                                                >
                                                    AI Career Roadmap Generator
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href=""
                                                    className="block px-4 py-2 text-sm text-white rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-green-400 to-teal-500"
                                                >
                                                    AI Chatbot System
                                                </a>
                                            </li>
                                        </ul>

                                    </motion.div>
                                </DropdownPortal>
                            )}
                        </AnimatePresence>
                    </>

                    <div
                        onClick={() => handleProtectedNav("/applications")}
                        className="cursor-pointer smky-btn3 relative hover:text-[#ffffff] py-1 px-2 text-[10px] md:text-xs after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#1b07f6] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white"
                    >
                        Applied Jobs
                    </div>



                    {/* Prep Dropdown */}
                    <>
                        <div
                            ref={prepBtnRef}
                            onMouseEnter={() => handleEnter(setIsPrepVisible)}
                            onMouseLeave={() => handleLeave(setIsPrepVisible)}
                            className="cursor-pointer smky-btn3 relative hover:text-[#ffffff] py-1 px-2 text-[10px] md:text-xs after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#1b07f6] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white"
                        >
                            Prep
                        </div>


                        {/* Portal Dropdown */}
                        <AnimatePresence>
                            {isPrepVisible && (
                                <DropdownPortal anchorRef={prepBtnRef} visible={true}>
                                    <motion.div
                                        onMouseEnter={() => handleEnter(setIsPrepVisible)}
                                        onMouseLeave={() => handleLeave(setIsPrepVisible)}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                    >
                                        <ul className="space-y-2">
                                            <li>
                                                <a
                                                    href="/interview-home"
                                                    className="block px-4 py-2 text-sm text-white rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-green-400 to-teal-500"
                                                >
                                                    AI Mock Interview
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/webinars"
                                                    className="block px-4 py-2 text-sm text-white rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-green-400 to-teal-500"
                                                >
                                                    Career Webinars
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/assessment"
                                                    className="block px-4 py-2 text-sm text-white rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-green-400 to-teal-500"
                                                >
                                                    Skill Assessment & Certification
                                                </a>
                                            </li>
                                        </ul>

                                    </motion.div>
                                </DropdownPortal>
                            )}
                        </AnimatePresence>

                    </>




                    <Link
                        to="/contact"
                        className="smky-btn3 relative hover:text-[#ffffff] py-1 px-2 text-[10px] md:text-xs after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#1b07f6] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white"
                    >
                        Contact Us
                    </Link>

                    <div className="relative inline-block m-4">
                        <Link
                            to={isPremium && isSignedIn ? "/resume" : "#"}
                            className="resu relative"
                        >
                            Build Your Resume
                            <div className="arrow-wrapper">
                                <div className="aro" />
                            </div>
                        </Link>

                        {/* Lock Overlay for non-premium or not logged in users */}
                        {(!isPremium || !isSignedIn) && (
                            <div
                                onClick={handleResumeClick}
                                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                            >
                                <span className="text-gray-800 text-2xl font-bold">🔒</span>
                            </div>
                        )}
                    </div>



                </div>


                {/* User Section (Desktop) */}
                <div className="hidden lg:flex items-center gap-4">
                    {user ? (
                        <>
                            <p className="hidden sm:block font-semibold text-white">Hi, {user.firstName}</p>
                            <UserButton />
                            <MembershipButton />
                        </>
                    ) : (
                        <>
                            <div className='flex gap-4 max-sm:text-xs'>
                                <button onClick={e => setShowRecruiterLogin(true)} className="brutalist-button">
                                    <div className="button-text">
                                        <span>Recruiter Login</span>
                                    </div>
                                </button>

                                <button onClick={e => openSignIn()} className='btn'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36px" height="36px">
                                        <rect width={36} height={36} x={0} y={0} fill="#fdd835" />
                                        <path fill="#e53935" d="M38.67,42H11.52C11.27,40.62,11,38.57,11,36c0-5,0-11,0-11s1.44-7.39,3.22-9.59 c1.67-2.06,2.76-3.48,6.78-4.41c3-0.7,7.13-0.23,9,1c2.15,1.42,3.37,6.67,3.81,11.29c1.49-0.3,5.21,0.2,5.5,1.28 C40.89,30.29,39.48,38.31,38.67,42z" />
                                        <path fill="#b71c1c" d="M39.02,42H11.99c-0.22-2.67-0.48-7.05-0.49-12.72c0.83,4.18,1.63,9.59,6.98,9.79 c3.48,0.12,8.27,0.55,9.83-2.45c1.57-3,3.72-8.95,3.51-15.62c-0.19-5.84-1.75-8.2-2.13-8.7c0.59,0.66,3.74,4.49,4.01,11.7 c0.03,0.83,0.06,1.72,0.08,2.66c4.21-0.15,5.93,1.5,6.07,2.35C40.68,33.85,39.8,38.9,39.02,42z" />
                                        <path fill="#212121" d="M35,27.17c0,3.67-0.28,11.2-0.42,14.83h-2C32.72,38.42,33,30.83,33,27.17 c0-5.54-1.46-12.65-3.55-14.02c-1.65-1.08-5.49-1.48-8.23-0.85c-3.62,0.83-4.57,1.99-6.14,3.92L15,16.32 c-1.31,1.6-2.59,6.92-3,8.96v10.8c0,2.58,0.28,4.61,0.54,5.92H10.5c-0.25-1.41-0.5-3.42-0.5-5.92l0.02-11.09 c0.15-0.77,1.55-7.63,3.43-9.94l0.08-0.09c1.65-2.03,2.96-3.63,7.25-4.61c3.28-0.76,7.67-0.25,9.77,1.13 C33.79,13.6,35,22.23,35,27.17z" />
                                        <path fill="#01579b" d="M17.165,17.283c5.217-0.055,9.391,0.283,9,6.011c-0.391,5.728-8.478,5.533-9.391,5.337 c-0.913-0.196-7.826-0.043-7.696-5.337C9.209,18,13.645,17.32,17.165,17.283z" />
                                        <path fill="#212121" d="M40.739,37.38c-0.28,1.99-0.69,3.53-1.22,4.62h-2.43c0.25-0.19,1.13-1.11,1.67-4.9 c0.57-4-0.23-11.79-0.93-12.78c-0.4-0.4-2.63-0.8-4.37-0.89l0.1-1.99c1.04,0.05,4.53,0.31,5.71,1.49 C40.689,24.36,41.289,33.53,40.739,37.38z" />
                                        <path fill="#81d4fa" d="M10.154,20.201c0.261,2.059-0.196,3.351,2.543,3.546s8.076,1.022,9.402-0.554 c1.326-1.576,1.75-4.365-0.891-5.267C19.336,17.287,12.959,16.251,10.154,20.201z" />
                                        <path fill="#212121" d="M17.615,29.677c-0.502,0-0.873-0.03-1.052-0.069c-0.086-0.019-0.236-0.035-0.434-0.06 c-5.344-0.679-8.053-2.784-8.052-6.255c0.001-2.698,1.17-7.238,8.986-7.32l0.181-0.002c3.444-0.038,6.414-0.068,8.272,1.818 c1.173,1.191,1.712,3,1.647,5.53c-0.044,1.688-0.785,3.147-2.144,4.217C22.785,29.296,19.388,29.677,17.615,29.677z M17.086,17.973 c-7.006,0.074-7.008,4.023-7.008,5.321c-0.001,3.109,3.598,3.926,6.305,4.27c0.273,0.035,0.48,0.063,0.601,0.089 c0.563,0.101,4.68,0.035,6.855-1.732c0.865-0.702,1.299-1.57,1.326-2.653c0.051-1.958-0.301-3.291-1.073-4.075 c-1.262-1.281-3.834-1.255-6.825-1.222L17.086,17.973z" />
                                        <path fill="#e1f5fe" d="M15.078,19.043c1.957-0.326,5.122-0.529,4.435,1.304c-0.489,1.304-7.185,2.185-7.185,0.652 C12.328,19.467,15.078,19.043,15.078,19.043z" />
                                    </svg>
                                    <span className="now">Now!</span>
                                    <span className="play">Login</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu (Dropdown) */}
            {menuOpen && (
                <div className="lg:hidden  text-white flex flex-col gap-3 p-4 mt-2 rounded-lg shadow-lg animate-slide-down">
                    <div className="flex flex-col items-center space-y-4">
                        <Link
                            to="/about"
                            className="smky-btn3 relative hover:text-[#ffffff] py-2 px-4 text-sm md:text-base after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#1b07f6] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white"
                        >
                            About Us
                        </Link>

                        {/* Highlight Dropdown */}
                        <div
                            ref={highlightBtnRef}
                            onMouseEnter={() => handleEnter(setIsHighlightVisible)}
                            onMouseLeave={() => handleLeave(setIsHighlightVisible)}
                            className="cursor-pointer smky-btn3 relative hover:text-[#ffffff] py-1 px-2 text-[10px] md:text-xs after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#1b07f6] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white"
                        >
                            Highlight
                        </div>

                        {/* Prep Dropdown */}
                        <div
                            ref={prepBtnRef}
                            onMouseEnter={() => handleEnter(setIsPrepVisible)}
                            onMouseLeave={() => handleLeave(setIsPrepVisible)}
                            className="cursor-pointer smky-btn3 relative hover:text-[#ffffff] py-1 px-2 text-[10px] md:text-xs after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#1b07f6] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white"
                        >
                            Prep
                        </div>

                        <div
                            onClick={() => handleProtectedNav("/applications")}
                            className="cursor-pointer smky-btn3 relative hover:text-[#ffffff] py-2 px-4 text-sm md:text-base after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#1b07f6] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white"
                        >
                            Applied Jobs
                        </div>

                        <Link
                            to="/contact"
                            className="smky-btn3 relative hover:text-[#ffffff] py-2 px-4 text-sm md:text-base after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#1b07f6] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-white"
                        >
                            Contact Us
                        </Link>
                    </div>

                    <div className="relative inline-block">
                        <Link
                            to={isPremium && isSignedIn ? "/resume" : "#"}
                            className="resu relative"
                        >
                            Build Your Resume
                            <div className="arrow-wrapper">
                                <div className="aro" />
                            </div>
                        </Link>

                        {/* Lock Overlay for non-premium or not logged in users */}
                        {(!isPremium || !isSignedIn) && (
                            <div
                                onClick={handleResumeClick}
                                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                            >
                                <span className="text-gray-800 text-2xl font-bold">🔒</span>
                            </div>
                        )}
                    </div>

                    {/* User Section (Mobile) */}
                    <div className="flex flex-col gap-3">
                        {user ? (
                            <>
                                <p className="font-semibold text-white">Hi, {user.firstName}</p>
                                <UserButton />
                                <MembershipButton />
                            </>
                        ) : (
                            <>
                                <div className="flex justify-center items-center h-full gap-7">
                                    <button
                                        onClick={() => {
                                            setShowRecruiterLogin(true);
                                            setMenuOpen(false);
                                        }}
                                        className="brutalist-button"
                                    >
                                        Recruiter Login
                                    </button>


                                    <button
                                        onClick={() => {
                                            openSignIn();
                                            setMenuOpen(false);
                                        }}
                                        className="btn"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36px" height="36px">
                                            <rect width={36} height={36} x={0} y={0} fill="#fdd835" />
                                            <path fill="#e53935" d="M38.67,42H11.52C11.27,40.62,11,38.57,11,36c0-5,0-11,0-11s1.44-7.39,3.22-9.59 c1.67-2.06,2.76-3.48,6.78-4.41c3-0.7,7.13-0.23,9,1c2.15,1.42,3.37,6.67,3.81,11.29c1.49-0.3,5.21,0.2,5.5,1.28 C40.89,30.29,39.48,38.31,38.67,42z" />
                                            <path fill="#b71c1c" d="M39.02,42H11.99c-0.22-2.67-0.48-7.05-0.49-12.72c0.83,4.18,1.63,9.59,6.98,9.79 c3.48,0.12,8.27,0.55,9.83-2.45c1.57-3,3.72-8.95,3.51-15.62c-0.19-5.84-1.75-8.2-2.13-8.7c0.59,0.66,3.74,4.49,4.01,11.7 c0.03,0.83,0.06,1.72,0.08,2.66c4.21-0.15,5.93,1.5,6.07,2.35C40.68,33.85,39.8,38.9,39.02,42z" />
                                            <path fill="#212121" d="M35,27.17c0,3.67-0.28,11.2-0.42,14.83h-2C32.72,38.42,33,30.83,33,27.17 c0-5.54-1.46-12.65-3.55-14.02c-1.65-1.08-5.49-1.48-8.23-0.85c-3.62,0.83-4.57,1.99-6.14,3.92L15,16.32 c-1.31,1.6-2.59,6.92-3,8.96v10.8c0,2.58,0.28,4.61,0.54,5.92H10.5c-0.25-1.41-0.5-3.42-0.5-5.92l0.02-11.09 c0.15-0.77,1.55-7.63,3.43-9.94l0.08-0.09c1.65-2.03,2.96-3.63,7.25-4.61c3.28-0.76,7.67-0.25,9.77,1.13 C33.79,13.6,35,22.23,35,27.17z" />
                                            <path fill="#01579b" d="M17.165,17.283c5.217-0.055,9.391,0.283,9,6.011c-0.391,5.728-8.478,5.533-9.391,5.337 c-0.913-0.196-7.826-0.043-7.696-5.337C9.209,18,13.645,17.32,17.165,17.283z" />
                                            <path fill="#212121" d="M40.739,37.38c-0.28,1.99-0.69,3.53-1.22,4.62h-2.43c0.25-0.19,1.13-1.11,1.67-4.9 c0.57-4-0.23-11.79-0.93-12.78c-0.4-0.4-2.63-0.8-4.37-0.89l0.1-1.99c1.04,0.05,4.53,0.31,5.71,1.49 C40.689,24.36,41.289,33.53,40.739,37.38z" />
                                            <path fill="#81d4fa" d="M10.154,20.201c0.261,2.059-0.196,3.351,2.543,3.546s8.076,1.022,9.402-0.554 c1.326-1.576,1.75-4.365-0.891-5.267C19.336,17.287,12.959,16.251,10.154,20.201z" />
                                            <path fill="#212121" d="M17.615,29.677c-0.502,0-0.873-0.03-1.052-0.069c-0.086-0.019-0.236-0.035-0.434-0.06 c-5.344-0.679-8.053-2.784-8.052-6.255c0.001-2.698,1.17-7.238,8.986-7.32l0.181-0.002c3.444-0.038,6.414-0.068,8.272,1.818 c1.173,1.191,1.712,3,1.647,5.53c-0.044,1.688-0.785,3.147-2.144,4.217C22.785,29.296,19.388,29.677,17.615,29.677z M17.086,17.973 c-7.006,0.074-7.008,4.023-7.008,5.321c-0.001,3.109,3.598,3.926,6.305,4.27c0.273,0.035,0.48,0.063,0.601,0.089 c0.563,0.101,4.68,0.035,6.855-1.732c0.865-0.702,1.299-1.57,1.326-2.653c0.051-1.958-0.301-3.291-1.073-4.075 c-1.262-1.281-3.834-1.255-6.825-1.222L17.086,17.973z" />
                                            <path fill="#e1f5fe" d="M15.078,19.043c1.957-0.326,5.122-0.529,4.435,1.304c-0.489,1.304-7.185,2.185-7.185,0.652 C12.328,19.467,15.078,19.043,15.078,19.043z" />
                                        </svg>
                                        <span className="now">Now!</span>
                                        <span className="play">Login</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

        </nav>
    );
};

export default Navbar;
