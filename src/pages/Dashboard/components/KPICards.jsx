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
        <div key={idx} className="bg-white dark:bg-[#23273D] dark:shadow-none p-5 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border-none dark:border-transparent hover:shadow-md dark:shadow-none transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-[20px] ${
              card.color === 'blue' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' :
              card.color === 'purple' ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' :
              card.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
              card.color === 'orange' ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400' :
              card.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
              card.color === 'teal' ? 'bg-teal-50 text-teal-600' :
              card.color === 'cyan' ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' :
              'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
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