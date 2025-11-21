import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.png';

// --- Icon Components ---
const DashboardIcon = () => <span>🏠</span>;
const LibraryIcon = () => <span>📚</span>;
const SubmitIcon = () => <span>➕</span>;
const AdminIcon = () => <span>⚙️</span>;
const AboutIcon = () => <span>ℹ️</span>;
const LogoutIcon = () => (
  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
);
// --- End Icon Components ---

function Sidebar({ user, onLogout, isSidebarOpen, setIsSidebarOpen }) {
  const linkStyle = "flex items-center p-3 my-1 rounded-lg text-gray-300 hover:bg-cyan-800 transition-colors";
  const activeLinkStyle = "bg-cyan-700 text-white font-semibold";

  return (
    <div
      className={`bg-gray-800 text-white flex flex-col p-4 shadow-lg fixed h-full z-20 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      
      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-10 px-2 overflow-hidden">
        <img src={Logo} alt="LibroVault Logo" className="w-10 h-10 flex-shrink-0" />
        <span className={`text-2xl font-bold transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
          LibroVault
        </span>
      </div>

      {/* Navigation Section */}
      <nav className="flex-grow">
        <NavLink to="/" end className={({ isActive }) => isActive ? `${linkStyle} ${activeLinkStyle}` : linkStyle}>
          <DashboardIcon />
          <span className={`ml-3 whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Dashboard</span>
        </NavLink>
        <NavLink to="/my-library" className={({ isActive }) => isActive ? `${linkStyle} ${activeLinkStyle}` : linkStyle}>
          <LibraryIcon />
          <span className={`ml-3 whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>My Library</span>
        </NavLink>
        <NavLink to="/submit" className={({ isActive }) => isActive ? `${linkStyle} ${activeLinkStyle}` : linkStyle}>
          <SubmitIcon />
          <span className={`ml-3 whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Submit Book</span>
        </NavLink>
        {user?.user_metadata?.role === 'admin' && (
          <NavLink to="/admin" className={({ isActive }) => isActive ? `${linkStyle} ${activeLinkStyle}` : linkStyle}>
            <AdminIcon />
            <span className={`ml-3 whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Admin</span>
          </NavLink>
        )}
        <NavLink to="/about" className={({ isActive }) => isActive ? `${linkStyle} ${activeLinkStyle}` : linkStyle}>
          <AboutIcon />
          <span className={`ml-3 whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>About Us</span>
        </NavLink>
      </nav>

      {/* User Profile & Logout Section */}
      <div className="mt-auto">
        {/* --- THIS IS THE FIX ---
          - 'w-full' ensures it always matches the parent's width (w-20 or w-64)
          - 'justify-between' is used when open
          - 'justify-center' is used when collapsed, to center the avatar
        */}
        <div className={`flex items-center p-2 bg-gray-700 rounded-lg w-full ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
          
          {/* Avatar (always visible) */}
          <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-gray-900 flex-shrink-0">
            {(user?.user_metadata?.username || user?.email)?.charAt(0).toUpperCase() || 'L'}
          </div>

          {/* User Info (Conditional Render) */}
          <div className={`ml-3 flex-1 overflow-hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <p className="font-semibold text-sm truncate">{user?.user_metadata?.username || 'User'}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>

          {/* Logout Button (Conditional Render) */}
          <button 
            onClick={onLogout} 
            className={`p-2 rounded-full text-gray-400 hover:bg-red-500 hover:text-white transition-colors flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'}`}
            title="Logout"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;