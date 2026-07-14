import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineDocumentText, HiOutlineCurrencyRupee, HiOutlinePhoto, HiOutlineArrowLeft, HiOutlineCheck } from 'react-icons/hi2';

const AddCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '', slug: '', price: 0, status: 'Published', teacher: '', category: '',
    shortDescription: '', duration: '', level: 'All Levels', language: 'English'
  });
  
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  
  const [teachers, setTeachers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch dependencies
    axios.get('http://localhost:5000/api/teachers').then(res => setTeachers(res.data.data)).catch(e => console.error(e));
    axios.get('http://localhost:5000/api/categories').then(res => setCategories(res.data.data)).catch(e => console.error(e));
    
    if (isEditing) {
      // Logic to fetch course data for edit goes here
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/courses/admin/${id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/courses/admin', formData);
      }
      navigate('/courses');
    } catch (error) {
      console.error(error);
      alert('Error saving course');
    }
  };

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
      // In a real scenario, you'd append this file to a FormData object during submit
    }
  };

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
              {isEditing ? 'Edit Course' : 'Create New Course'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Fill in the details below to publish a new course to the platform.</p>
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
            Save Course
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto space-y-8 pb-12">
        
        {/* Basic Information Section */}
        <div className="bg-white dark:bg-[#23273D] rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent p-6 sm:p-8">
          <SectionHeading 
            icon={HiOutlineDocumentText} 
            title="Basic Information" 
            description="Essential details that will be displayed on the course card and detail page." 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2">
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Course Title *</label>
              <input 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g. Complete Web Development Bootcamp"
                required 
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" 
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Short Description</label>
              <textarea 
                name="shortDescription" 
                value={formData.shortDescription} 
                onChange={handleChange} 
                rows="3"
                placeholder="A brief summary of the course (max 150 characters)..."
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none" 
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">URL Slug *</label>
              <input 
                name="slug" 
                value={formData.slug} 
                onChange={handleChange} 
                placeholder="complete-web-bootcamp"
                required 
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" 
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Category</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none"
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Level</label>
              <select 
                name="level" 
                value={formData.level} 
                onChange={handleChange} 
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none"
              >
                <option value="All Levels">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Language</label>
              <input 
                name="language" 
                value={formData.language} 
                onChange={handleChange} 
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all" 
              />
            </div>
          </div>
        </div>

        {/* Pricing & Management Section */}
        <div className="bg-white dark:bg-[#23273D] rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent p-6 sm:p-8">
          <SectionHeading 
            icon={HiOutlineCurrencyRupee} 
            title="Pricing & Management" 
            description="Set the cost of the course and assign instructors." 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Price (₹)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">₹</span>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl pl-10 pr-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all font-semibold" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Instructor *</label>
              <select 
                name="teacher" 
                value={formData.teacher} 
                onChange={handleChange} 
                required 
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none"
              >
                <option value="">Select Instructor</option>
                {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange} 
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white dark:bg-[#23273D] rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent p-6 sm:p-8">
          <SectionHeading 
            icon={HiOutlinePhoto} 
            title="Course Media" 
            description="Upload thumbnails and preview videos." 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group overflow-hidden h-[250px]">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleThumbnailChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              {thumbnailPreview ? (
                <img src={thumbnailPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
              ) : (
                <>
                  <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <HiOutlinePhoto className="text-3xl" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Upload Course Thumbnail</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1280x720 (16:9) recommended. Max 2MB.</p>
                </>
              )}
            </div>
            
            <div className="flex flex-col justify-center">
              <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Preview Video URL</label>
              <input 
                name="videoPreviewUrl" 
                onChange={handleChange} 
                placeholder="https://youtube.com/watch?v=..."
                className="w-full bg-gray-50 dark:bg-[#1A1D2F] border border-gray-200 dark:border-transparent rounded-xl px-4 py-3.5 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 mb-4" 
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Provide a YouTube or Vimeo link for the course preview trailer.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
