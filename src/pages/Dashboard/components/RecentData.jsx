import React from 'react';

const RecentData = ({ latestStudents = [], latestPayments = [] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Latest Students */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Latest Students</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {latestStudents.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:bg-gray-700/50/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{s.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{s.email}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">{new Date(s.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {latestStudents.length === 0 && (
                <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">No recent students found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Latest Payments */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Latest Payments</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-3 font-medium">Student</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {latestPayments.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:bg-gray-700/50/50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{p.userId?.name || 'Unknown'}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">₹{p.amount?.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${p.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
              {latestPayments.length === 0 && (
                <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">No recent payments found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentData;