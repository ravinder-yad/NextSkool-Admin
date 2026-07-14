import React from 'react';

const RecentActivity = ({ activities = [] }) => {
  return (
    <div className="bg-white dark:bg-[#23273D] dark:shadow-none p-6 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border-none dark:border-transparent mb-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Recent Activity</h3>
      <div className="space-y-6">
        {activities.map((act, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-50 dark:bg-blue-500/100 rounded-full mt-1.5" />
              {idx !== activities.length - 1 && <div className="w-0.5 h-full bg-gray-100 mt-2" />}
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">{act.time}</p>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">{act.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{act.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;