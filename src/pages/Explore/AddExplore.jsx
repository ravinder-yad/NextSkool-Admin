import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { exploreService } from '../../services/exploreService';
import toast from 'react-hot-toast';
import { HiOutlineArrowLeft, HiOutlineBookOpen, HiOutlinePhoto } from 'react-icons/hi2';

const AddExplore = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    longDescription: '',
    icon: 'HiCodeBracket',
    themeColor: '#4F46E5',
    category: 'Development',
    subCategory: '',
    courseCount: 0,
    featured: false,
    popular: false,
    trending: false,
    status: 'Active',
    displayOrder: 0,
    seoTitle: '',
    seoDescription: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchExploreItem = async () => {
        try {
          const res = await exploreService.getAllExplore();
          if (res.success) {
            const item = res.data.find(e => e._id === id);
            if (item) {
              setFormData({
                title: item.title || '',
                slug: item.slug || '',
                shortDescription: item.shortDescription || '',
                longDescription: item.longDescription || '',
                icon: item.icon || 'HiCodeBracket',
                themeColor: item.themeColor || '#4F46E5',
                category: item.category || 'Development',
                subCategory: item.subCategory || '',
                courseCount: item.courseCount || 0,
                featured: item.featured || false,
                popular: item.popular || false,
                trending: item.trending || false,
                status: item.status || 'Active',
                displayOrder: item.displayOrder || 0,
                seoTitle: item.seoTitle || '',
                seoDescription: item.seoDescription || '',
              });
              if (item.image) setImagePreview(`http://localhost:5000${item.image}`);
              if (item.banner) setBannerPreview(`http://localhost:5000${item.banner}`);
            }
          }
        } catch (error) {
          toast.error('Failed to fetch item data');
        }
      };
      fetchExploreItem();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSlugify = () => {
    if (formData.title && !isEditMode) {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });

      if (imageFile) submitData.append('image', imageFile);
      if (bannerFile) submitData.append('banner', bannerFile);

      let res;
      if (isEditMode) {
        res = await exploreService.updateExplore(id, submitData);
      } else {
        res = await exploreService.createExplore(submitData);
      }

      if (res.success) {
        toast.success(`Explore item ${isEditMode ? 'updated' : 'created'} successfully`);
        navigate('/explore');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-white/5">
        <Link 
          to="/explore"
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <HiOutlineArrowLeft className="text-xl" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight">
            {isEditMode ? 'Edit Explore Item' : 'Create Explore Item'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditMode ? 'Update existing mega menu explore item' : 'Add a new topic or category to the mega menu'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Basic Details Card */}
            <div className="bg-white dark:bg-[#23273D] p-8 rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <HiOutlineBookOpen className="text-indigo-500" /> Basic Information
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                    <input 
                      type="text" 
                      name="title" 
                      required 
                      value={formData.title} 
                      onChange={handleChange} 
                      onBlur={handleSlugify}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white" 
                      placeholder="e.g. Web Development"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Slug *</label>
                    <input 
                      type="text" 
                      name="slug" 
                      required 
                      value={formData.slug} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white font-mono text-sm" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Short Description *</label>
                  <textarea 
                    name="shortDescription" 
                    required 
                    value={formData.shortDescription} 
                    onChange={handleChange} 
                    rows="2" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white resize-none" 
                    placeholder="Brief summary for the mega menu..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Long Description</label>
                  <textarea 
                    name="longDescription" 
                    value={formData.longDescription} 
                    onChange={handleChange} 
                    rows="4" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white resize-none" 
                    placeholder="Detailed content for the landing page..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Media Uploads Card */}
            <div className="bg-white dark:bg-[#23273D] p-8 rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <HiOutlinePhoto className="text-indigo-500" /> Media & Theme
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Thumbnail Image */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Thumbnail Image</label>
                    <div className="relative group rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-black/10 overflow-hidden transition-all hover:border-indigo-500 dark:hover:border-indigo-500">
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
                        <HiOutlinePhoto className="text-3xl text-gray-400 mb-2 group-hover:text-indigo-500 transition-colors" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Click to upload thumbnail</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {imagePreview && (
                        <div className="relative w-full aspect-video z-10 bg-black">
                          <img src={imagePreview} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Banner Image */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Banner Image</label>
                    <div className="relative group rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-black/10 overflow-hidden transition-all hover:border-indigo-500 dark:hover:border-indigo-500">
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
                        <HiOutlinePhoto className="text-3xl text-gray-400 mb-2 group-hover:text-indigo-500 transition-colors" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Click to upload banner</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleBannerChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {bannerPreview && (
                        <div className="relative w-full aspect-video z-10 bg-black">
                          <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover opacity-80" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Icon Name</label>
                    <input 
                      type="text" 
                      name="icon" 
                      value={formData.icon} 
                      onChange={handleChange} 
                      placeholder="e.g. HiOutlineBookOpen" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Theme Color</label>
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-white/10 flex-shrink-0">
                        <input 
                          type="color" 
                          name="themeColor" 
                          value={formData.themeColor} 
                          onChange={handleChange} 
                          className="absolute -inset-2 w-16 h-16 cursor-pointer" 
                        />
                      </div>
                      <input 
                        type="text" 
                        value={formData.themeColor} 
                        readOnly
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none dark:bg-black/20 dark:border-white/10 dark:text-white font-mono text-sm" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            
            {/* Settings Card */}
            <div className="bg-white dark:bg-[#23273D] p-6 rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Settings</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <input 
                    type="text" 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Sub Category</label>
                  <input 
                    type="text" 
                    name="subCategory" 
                    value={formData.subCategory} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                
                <div className="pt-4 space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 bg-white border-gray-300" />
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Featured</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <input type="checkbox" name="popular" checked={formData.popular} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 bg-white border-gray-300" />
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Popular</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <input type="checkbox" name="trending" checked={formData.trending} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 bg-white border-gray-300" />
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Trending</span>
                  </label>
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Course Count</label>
                  <input 
                    type="number" 
                    name="courseCount" 
                    value={formData.courseCount} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Display Order</label>
                  <input 
                    type="number" 
                    name="displayOrder" 
                    value={formData.displayOrder} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white" 
                  />
                </div>
              </div>
            </div>

            {/* SEO Card */}
            <div className="bg-white dark:bg-[#23273D] p-6 rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">SEO Data</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">SEO Title</label>
                  <input 
                    type="text" 
                    name="seoTitle" 
                    value={formData.seoTitle} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">SEO Description</label>
                  <textarea 
                    name="seoDescription" 
                    value={formData.seoDescription} 
                    onChange={handleChange} 
                    rows="3" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 dark:border-white/5">
          <Link 
            to="/explore" 
            className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={loading} 
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : (isEditMode ? 'Update Explore Item' : 'Create Explore Item')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExplore;
