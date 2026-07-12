import React, { useState, useEffect } from 'react';
import { HiArrowLeft } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    content: '',
    category: '',
    tags: [],
    coverImage: '',
    readingTime: '',
    status: 'draft',
    isFeatured: false,
    authorName: 'NextSkool Admin',
    authorBio: 'Official NextSkool Team',
    authorPhoto: 'https://ui-avatars.com/api/?name=NextSkool+Admin&background=0D8ABC&color=fff'
  });

  useEffect(() => {
    fetchCategoriesAndTags();
  }, []);

  const fetchCategoriesAndTags = async () => {
    try {
      const [catsRes, tagsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/blogs/categories'),
        axios.get('http://localhost:5000/api/blogs/tags')
      ]);
      if (catsRes.data.success) setCategories(catsRes.data.data);
      if (tagsRes.data.success) setTags(tagsRes.data.data);
    } catch (error) {
      console.error('Failed to fetch categories/tags:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'tags') {
      const selectedTags = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, tags: selectedTags }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Basic slug generation from title
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      
      const payload = {
        ...formData,
        slug,
        author: {
          name: formData.authorName,
          photo: formData.authorPhoto,
          bio: formData.authorBio
        }
      };

      const res = await axios.post('http://localhost:5000/api/blogs', payload);
      
      if (res.data.success) {
        alert('Blog created successfully!');
        navigate('/blogs');
      }
    } catch (error) {
      console.error('Failed to create blog:', error);
      alert('Failed to create blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/blogs" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors">
          <HiArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Blog</h1>
          <p className="text-sm text-gray-500 mt-1">Write and publish a new article to the platform</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Basic Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blog Title *</label>
                  <input 
                    type="text" 
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Enter blog title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description *</label>
                  <textarea 
                    name="shortDescription"
                    required
                    rows="2"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Brief summary for the blog card..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content (Markdown supported) *</label>
                  <textarea 
                    name="content"
                    required
                    rows="15"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                    placeholder="# Write your content here...\n\nUse markdown for formatting."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Author Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author Name</label>
                  <input 
                    type="text" 
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author Bio</label>
                  <input 
                    type="text" 
                    name="authorBio"
                    value={formData.authorBio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Publish Settings */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Publish</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-slate-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-slate-700/50">
                  <input 
                    type="checkbox" 
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Feature this blog post</span>
                </label>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Save Blog Post'
                  )}
                </button>
              </div>
            </div>

            {/* Media */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Cover Image</h2>
              
              <div className="space-y-4">
                {formData.coverImage && (
                  <img src={formData.coverImage} alt="Cover Preview" className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-slate-600" />
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                  <input 
                    type="url" 
                    name="coverImage"
                    required
                    value={formData.coverImage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            {/* Classification */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Classification</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
                  <select 
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
                  <select 
                    name="tags"
                    multiple
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32"
                  >
                    {tags.map(t => (
                      <option key={t._id} value={t._id}>{t.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reading Time (minutes)</label>
                  <input 
                    type="number" 
                    name="readingTime"
                    min="1"
                    value={formData.readingTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
};

export default AddBlog;
