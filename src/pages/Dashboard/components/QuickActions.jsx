import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePlus, HiOutlineUserPlus, HiOutlineFolderPlus, HiOutlineDocumentText, HiOutlineBriefcase, HiOutlineAcademicCap } from 'react-icons/hi2';

const QuickActions = () => {
  const actions = [
    { name: 'Add Course', icon: <HiOutlinePlus size={20} />, path: '/courses/add', bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-700' },
    { name: 'Add Trainer', icon: <HiOutlineUserPlus size={20} />, path: '/trainers/add', bg: 'bg-purple-50 dark:bg-purple-500/10', text: 'text-purple-700' },
    { name: 'Add Category', icon: <HiOutlineFolderPlus size={20} />, path: '/categories', bg: 'bg-emerald-50', text: 'text-emerald-700' },
    { name: 'Publish Blog', icon: <HiOutlineDocumentText size={20} />, path: '/blogs/add', bg: 'bg-orange-50 dark:bg-orange-500/10', text: 'text-orange-700' },
    { name: 'Add Placement', icon: <HiOutlineBriefcase size={20} />, path: '/placements/add', bg: 'bg-indigo-50', text: 'text-indigo-700' },
    { name: 'Add Student', icon: <HiOutlineAcademicCap size={20} />, path: '/users', bg: 'bg-teal-50', text: 'text-teal-700' }
  ];

  return (
    <div className="bg-white dark:bg-[#23273D] dark:shadow-none p-6 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border-none dark:border-transparent mb-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, idx) => (
          <Link key={idx} to={action.path} className={`${action.bg} ${action.text} flex flex-col items-center justify-center p-4 rounded-[20px] hover:opacity-80 transition-opacity`}>
            <div className="mb-2">{action.icon}</div>
            <span className="text-sm font-medium">{action.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;