import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Logout function
  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
  };

  useEffect(() => {
    if (companyData) navigate("/dashboard/manage-jobs");
  }, [companyData]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ✅ Navbar with Glass Effect */}
      <div className="fixed w-full bg-white/60 backdrop-blur-lg shadow-sm py-5 px-6 z-10 flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          className="w-30 h-10 cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />
        {companyData && (
          <div className="flex items-center gap-4">
            <p className="hidden sm:block font-medium text-gray-800">Welcome, {companyData.name}</p>
            <div className="relative group">
              <img className="w-10 h-10 border-2 rounded-full cursor-pointer" src={companyData.image} alt="Company" />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded-md pt-12">
                <ul className="bg-white shadow-lg border rounded-md text-sm">
                  <li onClick={logout} className="py-2 px-4 cursor-pointer hover:bg-gray-100">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🔥 Sidebar with Hover Collapse */}
      <div
        className={`transition-all duration-300 min-h-screen ${
          isSidebarOpen ? "w-60" : "w-16"
        } bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 shadow-lg text-gray-900 flex flex-col
`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <ul className="flex flex-col pt-20">
          {[
            { path: "add-job", label: "Add Job", icon: assets.add_icon },
            { path: "manage-jobs", label: "Manage Jobs", icon: assets.home_icon },
            { path: "view-applications", label: "View Applications", icon: assets.person_tick_icon },
          ].map((item, index) => (
            <NavLink
              key={index}
              to={`/dashboard/${item.path}`}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 hover:bg-indigo-700 rounded-r-full transition-all duration-200
 ${
                  isActive ? "bg-blue-500/80 font-semibold" : ""
                }`
              }
            >
              <img className="w-6 h-6" src={item.icon} alt="" />
              {isSidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* 💡 Content Area */}
      <div className="flex-1 pt-20 px-6 sm:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
