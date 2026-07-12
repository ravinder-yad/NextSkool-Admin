import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { exploreService } from '../../services/exploreService';
import toast from 'react-hot-toast';
import { 
  HiOutlinePlus, 
  HiOutlinePencilSquare, 
  HiOutlineTrash,
  HiOutlineEye
} from 'react-icons/hi2';

const AllExplore = () => {
  const [explores, setExplores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExplores = async () => {
    try {
      setLoading(true);
      const res = await exploreService.getAllExplore();
      if (res.success) {
        setExplores(res.data);
      }
    } catch (error) {
      toast.error('Failed to fetch explore items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExplores();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this explore item?')) {
      try {
        const res = await exploreService.deleteExplore(id);
        if (res.success) {
          toast.success('Explore item deleted successfully');
          fetchExplores();
        }
      } catch (error) {
        toast.error('Failed to delete explore item');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Explore Items</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage all categories and topics in the mega menu</p>
        </div>
        <Link 
          to="/explore/add" 
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <HiOutlinePlus size={20} /> Add New
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300">
                <th className="p-4">Image/Icon</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-center">Courses</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Order</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : explores.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500">No explore items found.</td>
                </tr>
              ) : (
                explores.map((item) => (
                  <tr key={item._id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors">
                    <td className="p-4">
                      {item.image ? (
                        <img src={`http://localhost:5000${item.image}`} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                          {item.icon}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900 dark:text-white">{item.title}</div>
                      <div className="text-xs text-gray-500">/{item.slug}</div>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{item.category}</td>
                    <td className="p-4 text-center font-medium text-gray-700 dark:text-gray-300">{item.courseCount}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${item.featured ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                        {item.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center text-gray-600 dark:text-gray-300 font-medium">{item.displayOrder}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link to={`/explore/edit/${item._id}`} className="p-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 transition-colors">
                          <HiOutlinePencilSquare size={18} />
                        </Link>
                        <button onClick={() => handleDelete(item._id)} className="p-1.5 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-100 transition-colors">
                          <HiOutlineTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllExplore;
