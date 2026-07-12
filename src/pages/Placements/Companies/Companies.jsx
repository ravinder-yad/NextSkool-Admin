import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineBuildingOffice2 } from 'react-icons/hi2';

const API_URL = 'http://localhost:5000/api/placements/companies';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    location: '',
    description: '',
    hiringStatus: 'Active'
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL);
      setCompanies(data.data);
    } catch (error) {
      toast.error('Failed to fetch companies');
      console.error(error);
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
      // Get admin token if you have authentication setup. Assuming localStorage for now.
      const token = localStorage.getItem('token'); 
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.post(API_URL, formData, config);
      toast.success('Company added successfully!');
      setIsModalOpen(false);
      setFormData({ name: '', industry: '', website: '', location: '', description: '', hiringStatus: 'Active' });
      fetchCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add company');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Company deleted!');
        fetchCompanies();
      } catch (error) {
        toast.error('Failed to delete company');
      }
    }
  };

  return (
    <div className="p-6 h-full flex flex-col bg-[#F9FAFB] dark:bg-gray-950 transition-colors duration-200">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HiOutlineBuildingOffice2 className="text-primary" />
            Companies
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage hiring partners and companies</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <HiOutlinePlus size={18} />
          Add Company
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">Industry</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">Location</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500 dark:text-gray-400">Loading companies...</td>
                </tr>
              ) : companies.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500 dark:text-gray-400">No companies found. Click "Add Company" to get started.</td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr key={company._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-900 dark:text-white font-medium">{company.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{company.industry || '-'}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{company.location || '-'}</td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        company.hiringStatus === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        company.hiringStatus === 'Hiring' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {company.hiringStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm flex justify-end gap-3">
                      <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <HiOutlinePencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(company._id)} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        <HiOutlineTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Company Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Company</h2>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="company-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Industry</label>
                    <input type="text" name="industry" value={formData.industry} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website URL</label>
                  <input type="url" name="website" value={formData.website} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select name="hiringStatus" value={formData.hiringStatus} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                    <option value="Active">Active</option>
                    <option value="Hiring">Hiring</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"></textarea>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 bg-gray-50 dark:bg-gray-900/50 rounded-b-2xl">
              <button onClick={() => setIsModalOpen(false)} type="button" className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Cancel
              </button>
              <button form="company-form" type="submit" className="px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-700 rounded-lg shadow-sm transition-colors">
                Save Company
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;
