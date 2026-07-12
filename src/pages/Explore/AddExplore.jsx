import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { exploreService } from '../../services/exploreService';
import toast from 'react-hot-toast';

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
    themeColor: '#3B82F6',
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
  const [bannerFile, setBannerFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      // In a real scenario, you'd fetch by ID. 
      // Since our API currently only gets by slug, we could add a getById, 
      // or we can fetch all and filter for now. 
      // To keep it simple, we'll fetch all and find the item to edit.
      const fetchExploreItem = async () => {
        try {
          const res = await exploreService.getAllExplore();
          if (res.success) {
            const item = res.data.find(e => e._id === id);
            if (item) {
              setFormData({
                title: item.title,
                slug: item.slug,
                shortDescription: item.shortDescription,
                longDescription: item.longDescription,
                icon: item.icon,
                themeColor: item.themeColor,
                category: item.category,
                subCategory: item.subCategory,
                courseCount: item.courseCount,
                featured: item.featured,
                popular: item.popular,
                trending: item.trending,
                status: item.status,
                displayOrder: item.displayOrder,
                seoTitle: item.seoTitle,
                seoDescription: item.seoDescription,
              });
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
    if (formData.title) {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEditMode ? 'Edit Explore Item' : 'Add New Explore Item'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Title *</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} onBlur={!isEditMode ? handleSlugify : undefined} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Slug *</label>
            <input type="text" name="slug" required value={formData.slug} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Short Description *</label>
          <textarea name="shortDescription" required value={formData.shortDescription} onChange={handleChange} rows="2" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" maxLength="150" placeholder="Brief summary for the mega menu..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Long Description</label>
          <textarea name="longDescription" value={formData.longDescription} onChange={handleChange} rows="4" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Detailed content for the landing page..."></textarea>
        </div>

        {/* Media & Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">React Icon Name</label>
            <input type="text" name="icon" value={formData.icon} onChange={handleChange} placeholder="e.g. HiCodeBracket" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Theme Color</label>
            <input type="color" name="themeColor" value={formData.themeColor} onChange={handleChange} className="w-full h-10 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Thumbnail Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Banner Image</label>
            <input type="file" accept="image/*" onChange={(e) => setBannerFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </div>
        </div>

        {/* Categorization & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Sub Category</label>
            <input type="text" name="subCategory" value={formData.subCategory} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Course Count</label>
            <input type="number" name="courseCount" value={formData.courseCount} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
        </div>

        {/* Flags & Settings */}
        <div className="flex flex-wrap gap-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="popular" checked={formData.popular} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Popular</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="trending" checked={formData.trending} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Trending</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Display Order</label>
            <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
        </div>

        {/* SEO */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">SEO Title</label>
              <input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">SEO Description</label>
              <textarea name="seoDescription" value={formData.seoDescription} onChange={handleChange} rows="2" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Explore Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExplore;
