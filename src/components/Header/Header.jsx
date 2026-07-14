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
    <header className="h-20 bg-white/80 dark:bg-[#1A1D2F]/90 backdrop-blur-xl border-b border-gray-100/50 dark:border-transparent flex items-center justify-between px-6 sticky top-0 z-30 transition-colors duration-200">
      {/* Left Section */}
      <div className="flex items-center gap-5">
        <button 
          onClick={toggleSidebar}
          className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 dark:bg-[#23273D] dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-500/10 transition-colors"
        >
          <HiOutlineBars3 className="text-[22px]" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 hidden sm:block tracking-tight">Dashboard</h2>
      </div>

      {/* Center Section: Search */}
      <div className="flex-1 max-w-xl px-8 hidden md:block">
        <div className="relative group">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 dark:text-gray-400 text-lg group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search courses, students, trainers..." 
            className="w-full bg-[#F4F7FE] dark:bg-[#23273D] border border-transparent rounded-full pl-12 pr-12 py-2.5 text-[15px] focus:outline-none focus:bg-white dark:focus:bg-[#1A1D2F] focus:border-indigo-100 dark:focus:border-indigo-900 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-700 dark:text-gray-300"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            <span className="text-[11px] font-medium text-gray-400 dark:text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 rounded-md px-2 py-0.5 bg-white dark:bg-[#23273D]">⌘K</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-[#2D324D] transition-colors"
        >
          {isDark ? <HiOutlineSun className="text-[22px]" /> : <HiOutlineMoon className="text-[22px]" />}
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-[#2D324D] transition-colors relative">
          <HiOutlineBell className="text-[22px]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#09090b]"></span>
        </button>
        
        <button className="w-10 h-10 hidden sm:flex items-center justify-center rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-[#2D324D] transition-colors">
          <HiOutlineChatBubbleLeftRight className="text-[22px]" />
        </button>
        
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full transition-colors ml-1">
          <HiOutlinePlusCircle className="text-[20px]" />
          <span className="text-[14px] font-bold">Quick Add</span>
        </button>

        <div className="h-8 w-px bg-gray-200/60 dark:bg-[#23273D] mx-2 hidden sm:block"></div>

        {/* Profile Dropdown Trigger */}
        <button className="flex items-center gap-3 p-1.5 pr-4 rounded-full hover:bg-gray-50 dark:hover:bg-[#2D324D]/50 transition-colors">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm">
            R
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-[14px] font-bold text-gray-800 dark:text-gray-200 leading-none">Ravinder</span>
            <span className="text-[12px] font-medium text-gray-500 dark:text-gray-400 mt-1">Admin</span>
          </div>
          <HiChevronDown className="text-gray-400 text-sm ml-1" />
        </button>
      </div>
    </header>
  );
};

export default Header;
