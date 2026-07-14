import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import WelcomeBanner from './components/WelcomeBanner';
import KPICards from './components/KPICards';
import AnalyticsCharts from './components/AnalyticsCharts';
import QuickActions from './components/QuickActions';
import RecentData from './components/RecentData';
import RecentActivity from './components/RecentActivity';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/dashboard/summary');
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );

  const { settings, kpis, lists, activities } = data || {};
  const w = settings?.widgets || {};

  return (
    <div className="w-full max-w-[1600px] mx-auto font-inter p-2 sm:p-6">
      <div className="flex justify-end mb-4">
        <Link to="/dashboard/settings" className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors border border-gray-100/50 dark:border-transparent text-sm font-medium">
          <HiOutlineCog6Tooth size={18} /> Customize Dashboard
        </Link>
      </div>

      <WelcomeBanner />

      <KPICards kpis={kpis} />

      {w.analytics !== false && <AnalyticsCharts />}

      <QuickActions />

      {(w.students !== false || w.revenue !== false) && (
        <RecentData latestStudents={lists?.latestStudents} latestPayments={lists?.latestPayments} />
      )}

      {w.recentActivity !== false && <RecentActivity activities={activities} />}

    </div>
  );
};

export default Dashboard;