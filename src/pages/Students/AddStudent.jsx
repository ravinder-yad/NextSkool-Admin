import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import toast from 'react-hot-toast';
import { HiOutlineArrowLeft, HiOutlineUser, HiOutlineMapPin } from 'react-icons/hi2';

const AddStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    MobileNumber: '',
    Gender: 'Other',
    DateOfBirth: '',
    Address: '',
    City: '',
    State: '',
    Country: '',
    Pincode: '',
    IsVerified: false
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchStudent = async () => {
        try {
          const res = await studentService.getStudentById(id);
          if (res.success) {
            const data = res.data;
            setFormData({
              FullName: data.FullName || '',
              Email: data.Email || '',
              MobileNumber: data.MobileNumber || '',
              Gender: data.Gender || 'Other',
              DateOfBirth: data.DateOfBirth ? new Date(data.DateOfBirth).toISOString().split('T')[0] : '',
              Address: data.Address || '',
              City: data.City || '',
              State: data.State || '',
              Country: data.Country || '',
              Pincode: data.Pincode || '',
              IsVerified: data.IsVerified || false
            });
          }
        } catch (error) {
          toast.error('Failed to fetch student data');
        }
      };
      fetchStudent();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (isEditMode) {
        res = await studentService.updateStudent(id, formData);
      } else {
        res = await studentService.createStudent(formData);
      }

      if (res.success) {
        toast.success(`Student ${isEditMode ? 'updated' : 'added'} successfully`);
        navigate('/students');
      }
    } catch (error) {
      // Axios error handling
      const errorMsg = error.response?.data?.message || error.message || 'An error occurred';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-white/5">
        <Link 
          to="/students"
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <HiOutlineArrowLeft className="text-xl" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight">
            {isEditMode ? 'Edit Student Details' : 'Register New Student'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditMode ? 'Update student information and settings' : 'Add a new student manually to the system'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Personal Details Card */}
            <div className="bg-white dark:bg-[#23273D] p-8 rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <HiOutlineUser className="text-indigo-500" /> Personal Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    name="FullName" 
                    required 
                    value={formData.FullName} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white" 
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    name="Email" 
                    required 
                    disabled={isEditMode} // Usually shouldn't change email easily as it's linked to User model
                    value={formData.Email} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white disabled:opacity-50" 
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Mobile Number</label>
                  <input 
                    type="text" 
                    name="MobileNumber" 
                    value={formData.MobileNumber} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white" 
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
                  <input 
                    type="date" 
                    name="DateOfBirth" 
                    value={formData.DateOfBirth} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white [color-scheme:light] dark:[color-scheme:dark]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                  <select 
                    name="Gender" 
                    value={formData.Gender} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="flex items-center pt-8">
                  <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 transition-colors w-full">
                    <input type="checkbox" name="IsVerified" checked={formData.IsVerified} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 bg-white border-gray-300" />
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Account Verified</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Address Details Card */}
            <div className="bg-white dark:bg-[#23273D] p-8 rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <HiOutlineMapPin className="text-indigo-500" /> Address Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Address</label>
                  <textarea 
                    name="Address" 
                    value={formData.Address} 
                    onChange={handleChange} 
                    rows="2"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white resize-none" 
                    placeholder="123 Main Street, Apt 4B"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">City</label>
                    <input 
                      type="text" 
                      name="City" 
                      value={formData.City} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">State / Province</label>
                    <input 
                      type="text" 
                      name="State" 
                      value={formData.State} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Country</label>
                    <input 
                      type="text" 
                      name="Country" 
                      value={formData.Country} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Pincode / Zip</label>
                    <input 
                      type="text" 
                      name="Pincode" 
                      value={formData.Pincode} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:bg-black/20 dark:border-white/10 dark:text-white font-mono" 
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Column (Optional Info) */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-[#23273D] p-6 rounded-2xl shadow-sm border border-gray-100/50 dark:border-transparent">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Summary Info</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                When you create a student here, a User account with role "student" is automatically created in the backend so they can log in.
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 p-4 rounded-xl">
                <p className="text-xs text-indigo-800 dark:text-indigo-300">
                  <strong>Note:</strong> Default password for new manually added students is <code>defaultPassword123!</code>. They should change it upon first login.
                </p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 dark:border-white/5">
          <Link 
            to="/students" 
            className="px-6 py-3 font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={loading} 
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : (isEditMode ? 'Update Student' : 'Register Student')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
