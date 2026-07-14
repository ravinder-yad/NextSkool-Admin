
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineSquares2X2, HiOutlineArrowLeft, HiOutlineCheck } from 'react-icons/hi2';

const AddCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '', slug: '', description: '',
  });

  useEffect(() => {
    if (isEditing) {
      axios.get(`http://localhost:5000/api/categories/${id}`)
        .then(res => setFormData(res.data.data || res.data))
        .catch(e => console.error('Error fetching category:', e));
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/categories/${id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/categories', formData);
      }
      navigate('/categories');
    } catch (error) {
      console.error(error);
      alert('Error saving category');
    }
  };

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const SectionHeading = ({ icon: Icon, title, description }) => (
    <div className="mb-6 flex items-start gap-4">
      <div className="p-3 bg-indigo-50 dark:bg-[#1A1D2F] text-indigo-600 dark:text-indigo-400 rounded-xl">
        <Icon className="text-xl" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#23273D] border border-gray-200 dark:border-transparent text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 shadow-sm transition-all"
          >
            <HiOutlineArrowLeft className="text-lg" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight">
              {isEditing ? 'Edit Category' : 'Create New Category'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add a new category to group your courses.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="px-5 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] font-medium transition-all flex items-center gap-2"
          >
            <HiOutlineCheck className="text-lg" />
            Save Category
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto pb-12">
        <div className="bg-white dark:bg-[#23273D] rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent p-6 sm:p-8">
          <SectionHeading 
            icon={HiOutlineSquares2X2} 
            title="Category Details" 
            description="Enter the name and slug for the new category." 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Category Name *</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="e.g. Web Development"
                required 
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" 
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Slug *</label>
              <input 
                name="slug" 
                value={formData.slug} 
                onChange={handleChange} 
                placeholder="web-development"
                required 
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" 
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="4"
                placeholder="Optional description for this category..."
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none" 
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
