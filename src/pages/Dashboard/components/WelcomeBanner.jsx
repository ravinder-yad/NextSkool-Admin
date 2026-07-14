import React from 'react';
import { HiOutlineCalendar, HiOutlineSun } from 'react-icons/hi2';

const WelcomeBanner = () => {
  return (
    <div className="bg-white dark:bg-[#23273D] dark:shadow-none p-6 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border-none dark:border-transparent mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Welcome Back, Ravinder 👋</h1>
        <p className="text-gray-500 dark:text-gray-400">Here's what's happening on NextSkool today.</p>
      </div>
      <div className="flex gap-4 mt-4 md:mt-0">
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-700 rounded-[20px]">
          <HiOutlineCalendar size={20} />
          <span className="font-medium">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 rounded-[20px]">
          <HiOutlineSun size={20} />
          <span className="font-medium">Jaipur, 32°C</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;