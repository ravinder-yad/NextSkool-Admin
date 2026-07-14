import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineSquares2X2, HiOutlineArrowLeft, HiOutlineCheck, HiOutlineAdjustmentsHorizontal, HiOutlinePhoto } from 'react-icons/hi2';

const AddCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '', slug: '', description: '',
    isActive: true, isFeatured: false, displayOrder: 0
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);

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

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value});

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
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Group your courses elegantly using categories.</p>
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
      
      <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto space-y-8 pb-12">
        {/* Basic Information Section */}
        <div className="bg-white dark:bg-[#23273D] rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent p-6 sm:p-8">
          <SectionHeading 
            icon={HiOutlineSquares2X2} 
            title="Category Details" 
            description="Enter the core information for this category." 
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

        {/* Configuration Section */}
        <div className="bg-white dark:bg-[#23273D] rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent p-6 sm:p-8">
          <SectionHeading 
            icon={HiOutlineAdjustmentsHorizontal} 
            title="Visibility & Settings" 
            description="Control how and where this category is displayed." 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Status</label>
              <select 
                name="isActive" 
                value={formData.isActive} 
                onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})} 
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none"
              >
                <option value="true">Active (Visible)</option>
                <option value="false">Inactive (Hidden)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Display Order</label>
              <input 
                type="number"
                name="displayOrder" 
                value={formData.displayOrder} 
                onChange={handleChange} 
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all" 
              />
            </div>

            <div className="flex items-center mt-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 bg-gray-50 dark:bg-[#1A1D2F] dark:border-gray-600 dark:checked:bg-indigo-500"
                />
                <span className="text-[14px] font-semibold text-gray-700 dark:text-gray-300">Mark as Featured</span>
              </label>
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white dark:bg-[#23273D] rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent p-6 sm:p-8">
          <SectionHeading 
            icon={HiOutlinePhoto} 
            title="Category Media" 
            description="Upload an icon and a cover image for the category." 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group overflow-hidden h-[250px]">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setIconPreview(URL.createObjectURL(e.target.files[0]))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              {iconPreview ? (
                <img src={iconPreview} alt="Preview" className="absolute inset-0 w-full h-full object-contain p-4 rounded-xl" />
              ) : (
                <>
                  <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <HiOutlinePhoto className="text-3xl" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Upload Icon</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">SVG or PNG (100x100).</p>
                </>
              )}
            </div>

            <div className="relative border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group overflow-hidden h-[250px]">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
              ) : (
                <>
                  <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <HiOutlinePhoto className="text-3xl" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Upload Cover Image</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1280x720 recommended. Max 2MB.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
