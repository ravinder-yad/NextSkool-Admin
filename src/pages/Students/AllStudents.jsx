import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import toast from 'react-hot-toast';
import { 
  HiOutlinePlus, 
  HiOutlinePencil, 
  HiOutlineTrash,
  HiOutlineUsers,
  HiOutlineMail,
  HiOutlinePhone
} from 'react-icons/hi2';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await studentService.getAllStudents();
      if (res.success) {
        setStudents(res.data);
      }
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const res = await studentService.deleteStudent(id);
        if (res.success) {
          toast.success('Student deleted successfully');
          fetchStudents();
        }
      } catch (error) {
        toast.error('Failed to delete student');
      }
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <HiOutlineUsers className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight">All Students</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage registered students and their enrollments.</p>
          </div>
        </div>
        <Link 
          to="/students/add" 
          className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] font-medium transition-all"
        >
          <HiOutlinePlus className="text-lg" /> Add Student
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
                  <th className="p-4 pl-6">Student Details</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4 text-center">Enrolled Courses</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-4">
                          {student.ProfileImage ? (
                            <img src={student.ProfileImage} alt={student.FullName} className="w-10 h-10 rounded-full object-cover bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-700" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold border-2 border-white dark:border-gray-700">
                              {student.FullName ? student.FullName.charAt(0).toUpperCase() : 'S'}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-gray-800 dark:text-white">{student.FullName}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Joined: {new Date(student.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2"><HiOutlineMail className="text-gray-400" /> {student.Email}</div>
                          {student.MobileNumber && <div className="flex items-center gap-2"><HiOutlinePhone className="text-gray-400" /> {student.MobileNumber}</div>}
                        </div>
                      </td>
                      <td className="p-4 text-center font-bold text-gray-700 dark:text-gray-300">
                        {student.EnrolledCourses?.length || 0}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${student.IsVerified ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'}`}>
                          {student.IsVerified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          <Link to={`/students/edit/${student._id}`} className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                            <HiOutlinePencil className="text-lg" />
                          </Link>
                          <button onClick={() => handleDelete(student._id)} className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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

export default AllStudents;
