import React from 'react';
import { 
  HiOutlineUsers, 
  HiOutlineBookOpen, 
  HiOutlineCurrencyRupee, 
  HiOutlineBriefcase,
  HiOutlineArrowTrendingUp,
  HiOutlineChartBar
} from 'react-icons/hi2';

const StatCard = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-border dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-secondary dark:text-gray-400">{title}</h3>
        <div className="w-10 h-10 rounded-xl bg-primary-light dark:bg-primary/20 text-primary flex items-center justify-center text-xl">
          {icon}
        </div>
      </div>
      <div className="flex items-end gap-3">
        <h2 className="text-3xl font-bold text-text-main dark:text-white">{value}</h2>
        <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">
          <HiOutlineArrowTrendingUp />
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const stats = [
    { title: 'Total Students', value: '12,500', icon: <HiOutlineUsers />, trend: '+25%' },
    { title: 'Active Courses', value: '320', icon: <HiOutlineBookOpen />, trend: '+15%' },
    { title: 'Total Revenue', value: '₹12,50,000', icon: <HiOutlineCurrencyRupee />, trend: '+10%' },
    { title: 'Total Placements', value: '980', icon: <HiOutlineBriefcase />, trend: '+8%' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main dark:text-white tracking-tight">Overview</h1>
          <p className="text-sm text-secondary dark:text-gray-400 mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-border dark:border-gray-800 text-text-main dark:text-gray-200 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
            Download Report
          </button>
          <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 dark:shadow-blue-900/20">
            Create Course
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Additional Dashboard Content (Charts, Tables) can go here */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-border dark:border-gray-800 shadow-sm h-96 flex flex-col justify-center items-center">
          <HiOutlineChartBar className="text-4xl text-gray-300 dark:text-gray-700 mb-3" />
          <p className="text-secondary dark:text-gray-500 font-medium">Revenue Chart Area</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-border dark:border-gray-800 shadow-sm h-96 flex flex-col justify-center items-center">
          <HiOutlineUsers className="text-4xl text-gray-300 dark:text-gray-700 mb-3" />
          <p className="text-secondary dark:text-gray-500 font-medium">Recent Activity</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
