import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineCheckBadge, HiOutlineEyeSlash, HiOutlineBookOpen } from 'react-icons/hi2';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const isDraftRoute = location.pathname.includes('/draft');
  const isFeaturedRoute = location.pathname.includes('/featured');

  let title = "All Courses";
  let description = "Manage all courses available on your platform.";
  if (isDraftRoute) {
    title = "Draft Courses";
    description = "Review and edit courses before publishing.";
  }
  if (isFeaturedRoute) {
    title = "Featured Courses";
    description = "Manage the highlighted courses on your storefront.";
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/courses/admin/all');
      setCourses(res.data.data);
    } catch (error) {
      console.error('Error fetching courses', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if(window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/admin/${id}`);
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course', error);
      }
    }
  };

  const filteredCourses = courses.filter(course => {
    if (isDraftRoute) return course.status === 'Draft';
    if (isFeaturedRoute) return course.isFeatured === true;
    return true; // All Courses
  });

  return (
    <div className="max-w-[1600px] mx-auto w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <HiOutlineBookOpen className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight">{title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          </div>
        </div>
        <Link 
          to="/courses/add" 
          className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] font-medium transition-all"
        >
          <HiOutlinePlus className="text-lg" /> Add Course
        </Link>
      </div>

      <div className="bg-white dark:bg-[#23273D] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none overflow-hidden">
        {loading ? (
          <div className="p-10 flex justify-center">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/10 text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider bg-gray-50/50 dark:bg-black/10">
                  <th className="p-4 pl-6">Course</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">
                      No courses found.
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course) => (
                    <tr key={course._id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
                            {course.thumbnail ? (
                              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">Img</div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white line-clamp-1">{course.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {course.isFeatured && <span className="text-[10px] bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-1.5 py-0.5 rounded font-medium">Featured</span>}
                              {course.isPopular && <span className="text-[10px] bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 px-1.5 py-0.5 rounded font-medium">Popular</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{course.category?.name || 'Uncategorized'}</td>
                      <td className="p-4 text-gray-800 dark:text-white font-medium">
                        {course.price === 0 ? 'Free' : `₹${course.price}`}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          course.status === 'Published' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}>
                          {course.status === 'Published' ? <HiOutlineCheckBadge /> : <HiOutlineEyeSlash />}
                          {course.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Link to={`/courses/edit/${course._id}`} className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                            <HiOutlinePencil className="text-lg" />
                          </Link>
                          <button onClick={() => deleteCourse(course._id)} className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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

export default AllCourses;
