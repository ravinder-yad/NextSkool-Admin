import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineCheck } from 'react-icons/hi2';

const ManageContactSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/contact');
      setSettings(data.data || {});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:5000/api/contact/settings', settings);
      alert('Saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Error saving data');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contact Settings</h1>
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <HiOutlineCheck size={20} /> Save Changes
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold mb-4">Office Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={settings?.office?.email || ''} 
              onChange={e => setSettings({...settings, office: {...settings.office, email: e.target.value}})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              type="text" 
              value={settings?.office?.phone || ''} 
              onChange={e => setSettings({...settings, office: {...settings.office, phone: e.target.value}})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageContactSettings;