import React from 'react';

const RecentActivity = ({ activities = [] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Recent Activity</h3>
      <div className="space-y-6">
        {activities.map((act, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5" />
              {idx !== activities.length - 1 && <div className="w-0.5 h-full bg-gray-100 mt-2" />}
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-600 mb-1">{act.time}</p>
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