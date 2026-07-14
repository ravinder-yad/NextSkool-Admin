
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2';

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/categories');
      // Adjust according to your actual API response
      setCategories(res.data.data || res.data || []);
    } catch (error) {
      console.error('Error fetching categories', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if(window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category', error);
      }
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">All Categories</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage course categories for your platform.</p>
        </div>
        <Link 
          to="/categories/add" 
          className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-colors"
        >
          <HiOutlinePlus className="text-xl" /> Add Category
        </Link>
      </div>

      <div className="bg-white dark:bg-[#23273D] rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent overflow-hidden">
        {loading ? (
          <div className="p-10 flex justify-center">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/10 text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider bg-gray-50/50 dark:bg-black/10">
                  <th className="p-4 pl-6">Category Name</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-gray-500 dark:text-gray-400">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 pl-6 font-medium text-gray-800 dark:text-white">
                        {category.name}
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">{category.slug}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Link to={`/categories/edit/${category._id}`} className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                            <HiOutlinePencil className="text-lg" />
                          </Link>
                          <button onClick={() => deleteCategory(category._id)} className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                            <HiOutlineTrash className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategories;
