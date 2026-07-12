import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineCheck, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2';

const ManageAbout = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/about');
      setAboutData(data.data || {});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:5000/api/about', aboutData);
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
        <h1 className="text-2xl font-bold text-gray-800">Manage About Page</h1>
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <HiOutlineCheck size={20} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg p-2" 
                value={aboutData?.hero?.title || ''} 
                onChange={(e) => setAboutData({ ...aboutData, hero: { ...aboutData.hero, title: e.target.value } })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg p-2" 
                value={aboutData?.hero?.subtitle || ''} 
                onChange={(e) => setAboutData({ ...aboutData, hero: { ...aboutData.hero, subtitle: e.target.value } })}
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold mb-4">Mission & Vision</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mission</label>
              <textarea className="w-full border border-gray-300 rounded-lg p-2 h-24" 
                value={aboutData?.mission?.description || ''} 
                onChange={(e) => setAboutData({ ...aboutData, mission: { ...aboutData.mission, description: e.target.value } })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vision</label>
              <textarea className="w-full border border-gray-300 rounded-lg p-2 h-24" 
                value={aboutData?.vision?.description || ''} 
                onChange={(e) => setAboutData({ ...aboutData, vision: { ...aboutData.vision, description: e.target.value } })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageAbout;