import React from 'react';
import { 
  HiOutlineBars3, 
  HiOutlineMagnifyingGlass, 
  HiOutlineMoon, 
  HiOutlineSun,
  HiOutlineBell, 
  HiOutlineChatBubbleLeftRight, 
  HiOutlinePlusCircle, 
  HiOutlineUserCircle, 
  HiChevronDown 
} from 'react-icons/hi2';
import { useTheme } from '../../context/ThemeContext';

const Header = ({ toggleSidebar }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-border dark:border-gray-800 flex items-center justify-between px-4 sticky top-0 z-30 transition-colors duration-200">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-secondary hover:bg-gray-100 transition-colors"
        >
          <HiOutlineBars3 className="text-2xl" />
        </button>
        <h2 className="text-lg font-semibold text-text-main hidden sm:block">Dashboard</h2>
      </div>

      {/* Center Section: Search */}
      <div className="flex-1 max-w-xl px-6 hidden md:block">
        <div className="relative group">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search courses, students, trainers..." 
            className="w-full bg-gray-100 dark:bg-gray-800/50 border border-transparent rounded-lg pl-10 pr-12 py-2 text-sm focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-gray-300 dark:focus:border-gray-700 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-text-main dark:text-gray-200"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5 bg-white dark:bg-gray-800 shadow-sm">/</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDark ? <HiOutlineSun className="text-xl" /> : <HiOutlineMoon className="text-xl" />}
        </button>
        
        <button className="p-2 rounded-lg text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
          <HiOutlineBell className="text-xl" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <button className="p-2 rounded-lg text-secondary hover:bg-gray-100 transition-colors hidden sm:block">
          <HiOutlineChatBubbleLeftRight className="text-xl" />
        </button>
        
        <button className="p-2 rounded-lg text-secondary hover:bg-gray-100 transition-colors hidden sm:flex items-center gap-2">
          <HiOutlinePlusCircle className="text-xl" />
          <span className="text-sm font-medium">Quick Add</span>
        </button>

        <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>

        {/* Profile Dropdown Trigger */}
        <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors pl-2">
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold overflow-hidden">
            {/* Can put img tag here later */}
            <HiOutlineUserCircle className="text-2xl" />
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-semibold text-text-main leading-none">Ravinder</span>
            <span className="text-xs text-secondary mt-1">Admin</span>
          </div>
          <HiChevronDown className="text-secondary text-sm ml-1" />
        </button>
      </div>
    </header>
  );
};

export default Header;
