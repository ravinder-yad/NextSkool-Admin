import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineStar } from 'react-icons/hi2';

const API_URL = 'http://localhost:5000/api/placements/success-stories';

const SuccessStories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const initialFormState = { title: '', student: '', description: '', rating: 5 };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setData(res.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      toast.success('Successfully added!');
      setIsModalOpen(false);
      setFormData(initialFormState);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add record');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        toast.success('Record deleted!');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete record');
      }
    }
  };

  return (
    <div className="p-6 h-full flex flex-col bg-[#F9FAFB] dark:bg-gray-950 transition-colors duration-200">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HiOutlineStar className="text-primary" /> Success Stories
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage student testimonials and stories</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <HiOutlinePlus size={18} /> Add Story
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">Title</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">Rating</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" className="py-10 text-center text-gray-500">Loading...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="3" className="py-10 text-center text-gray-500">No records found.</td></tr>
              ) : (
                data.map((item) => (
                  <tr key={item._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">{item.title}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{item.rating}/5</td>
                    <td className="py-4 px-6 text-sm flex justify-end gap-3">
                      <button className="text-gray-400 hover:text-blue-600"><HiOutlinePencil size={18} /></button>
                      <button onClick={() => handleDelete(item._id)} className="text-gray-400 hover:text-red-600"><HiOutlineTrash size={18} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Success Story</h2>
            </div>
            <div className="p-6 overflow-y-auto">
              <form id="record-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Rating (1-5)</label>
                  <input type="number" min="1" max="5" name="rating" value={formData.rating} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description / Testimonial</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"></textarea>
                </div>
              </form>
            </div>
            <div className="p-6 border-t flex justify-end gap-3 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-sm font-medium hover:bg-gray-200 rounded-lg dark:text-gray-300 dark:hover:bg-gray-800">Cancel</button>
              <button form="record-form" type="submit" className="px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-700 rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;
