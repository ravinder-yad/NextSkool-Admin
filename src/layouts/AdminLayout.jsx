import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen bg-[#F4F7FE] dark:bg-[#1A1D2F] overflow-hidden transition-colors duration-200">
      <Sidebar isCollapsed={isCollapsed} />
      
      <div 
        className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${
          isCollapsed ? 'ml-20' : 'ml-[280px]'
        }`}
      >
        <Header toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 text-text-main dark:text-gray-100">
          <div className="w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
