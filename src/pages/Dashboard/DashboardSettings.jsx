import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HiOutlineCheck } from 'react-icons/hi2';

const DashboardSettings = () => {
  const [widgets, setWidgets] = useState({
    revenue: true, students: true, courses: true, placements: true,
    calendar: true, notifications: true, analytics: true, recentActivity: true
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/summary');
        if (res.data.data.settings?.widgets) {
          setWidgets(res.data.data.settings.widgets);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:5000/api/dashboard/settings', { widgets });
      navigate('/');
    } catch (error) {
      alert('Failed to save settings');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Dashboard Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Customize which widgets appear on your main dashboard view.</p>
        </div>
        <button onClick={handleSave} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:bg-blue-700 transition-colors">
          <HiOutlineCheck size={20} /> Save Changes
        </button>
      </div>

      <div className="bg-white dark:bg-[#111111] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] dark:shadow-none border border-gray-100/60 dark:border-white/10 overflow-hidden">
        <div className="p-6 space-y-6">
          {Object.entries(widgets).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-white/10 last:border-0">
              <div>
                <h3 className="text-gray-800 dark:text-gray-100 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Show or hide the {key} section on the dashboard.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={value}
                  onChange={(e) => setWidgets({...widgets, [key]: e.target.checked})}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-[#222222] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-white/20 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;