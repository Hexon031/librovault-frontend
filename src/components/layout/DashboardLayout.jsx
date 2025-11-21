import React, { useState } from 'react'; // Import useState
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

function DashboardLayout({ user, onLogout }) {
  // 1. Add state to track if the sidebar is open or closed
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900">
      
      {/* 2. Pass the state and the function to change it down to the Sidebar */}
      <Sidebar 
        user={user} 
        onLogout={onLogout} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* 3. Make the margin-left dynamic based on the sidebar's state */}
      <div 
        className={`flex flex-col flex-grow overflow-y-auto text-gray-200 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        
        <main className="flex-grow p-8">
          {/* Outlet renders the active page component */}
          <Outlet />
        </main>

        {/* The Footer will now also inherit the light text color */}
        <Footer />
        
      </div>
    </div>
  );
}

export default DashboardLayout;