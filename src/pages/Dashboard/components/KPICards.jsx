import React from 'react';
import { HiOutlineUsers, HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlineCurrencyRupee, HiOutlineCheckBadge, HiOutlineBuildingOffice, HiOutlineStar } from 'react-icons/hi2';

const KPICards = ({ kpis }) => {
  const cards = [
    { title: 'Total Students', value: kpis?.totalStudents?.value, growth: kpis?.totalStudents?.growth, icon: <HiOutlineUsers />, color: 'blue' },
    { title: 'Total Trainers', value: kpis?.totalTrainers?.value, growth: kpis?.totalTrainers?.growth, icon: <HiOutlineAcademicCap />, color: 'purple' },
    { title: 'Total Courses', value: kpis?.totalCourses?.value, growth: kpis?.totalCourses?.growth, icon: <HiOutlineBookOpen />, color: 'indigo' },
    { title: 'Revenue', value: typeof kpis?.totalRevenue?.value === 'number' ? `₹${kpis?.totalRevenue?.value.toLocaleString()}` : kpis?.totalRevenue?.value, growth: kpis?.totalRevenue?.growth, icon: <HiOutlineCurrencyRupee />, color: 'emerald' },
    { title: 'Enrollments', value: kpis?.totalEnrollments?.value, growth: kpis?.totalEnrollments?.growth, icon: <HiOutlineCheckBadge />, color: 'orange' },
    { title: 'Placement Rate', value: kpis?.placementRate?.value, growth: kpis?.placementRate?.growth, icon: <HiOutlineCheckBadge />, color: 'teal' },
    { title: 'Hiring Companies', value: kpis?.hiringCompanies?.value, growth: kpis?.hiringCompanies?.growth, icon: <HiOutlineBuildingOffice />, color: 'cyan' },
    { title: 'Average Rating', value: kpis?.averageRating?.value, growth: kpis?.averageRating?.growth, icon: <HiOutlineStar />, color: 'yellow' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${
              card.color === 'blue' ? 'bg-blue-50 text-blue-600' :
              card.color === 'purple' ? 'bg-purple-50 text-purple-600' :
              card.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
              card.color === 'orange' ? 'bg-orange-50 text-orange-600' :
              card.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
              card.color === 'teal' ? 'bg-teal-50 text-teal-600' :
              card.color === 'cyan' ? 'bg-cyan-50 text-cyan-600' :
              'bg-yellow-50 text-yellow-600'
            }`}>
              {React.cloneElement(card.icon, { size: 24 })}
            </div>
            {card.growth !== '0' && (
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${card.growth?.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {card.growth}
              </span>
            )}
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{card.title}</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;