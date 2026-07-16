import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';

import AllCourses from './pages/Courses/AllCourses';
import AddCourse from './pages/Courses/AddCourse';
import AllCategories from './pages/Categories/AllCategories';
import AddCategory from './pages/Categories/AddCategory';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardSettings from './pages/Dashboard/DashboardSettings';
import PlacementDashboard from './pages/Placements/PlacementDashboard/PlacementDashboard';
import Companies from './pages/Placements/Companies/Companies';
import PlacementDrives from './pages/Placements/PlacementDrives/PlacementDrives';
import PlacedStudents from './pages/Placements/PlacedStudents/PlacedStudents';
import SuccessStories from './pages/Placements/SuccessStories/SuccessStories';
import HiringPartners from './pages/Placements/HiringPartners/HiringPartners';
import JobOpportunities from './pages/Placements/JobOpportunities/JobOpportunities';
import Internships from './pages/Placements/Internships/Internships';
import AllExplore from './pages/Explore/AllExplore';
import AddExplore from './pages/Explore/AddExplore';
import AllBlogs from './pages/Blog/AllBlogs';
import AddBlog from './pages/Blog/AddBlog';
import ManageAbout from './pages/About/ManageAbout';
import ManageTeam from './pages/About/ManageTeam';
import ManageFAQs from './pages/About/ManageFAQs';
import ManageTestimonials from './pages/About/ManageTestimonials';

import ManageContactSettings from './pages/Contact/ManageContactSettings';
import ManageSupportTeam from './pages/Contact/ManageSupportTeam';
import ContactMessages from './pages/Contact/ContactMessages';
import Newsletter from './pages/Contact/Newsletter';

import AllStudents from './pages/Students/AllStudents';
import AddStudent from './pages/Students/AddStudent';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard/settings" element={<DashboardSettings />} />
            
            
            {/* Course Management Routes */}
            <Route path="courses" element={<AllCourses />} />
            <Route path="courses/add" element={<AddCourse />} />
            <Route path="courses/edit/:id" element={<AddCourse />} />
            <Route path="courses/draft" element={<AllCourses />} />
            <Route path="courses/featured" element={<AllCourses />} />

            
            {/* Category Management Routes */}
            <Route path="categories" element={<AllCategories />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route path="categories/edit/:id" element={<AddCategory />} />

            {/* Placement Routes */}
            <Route path="placements" element={<Navigate to="/placements/dashboard" replace />} />
            <Route path="placements/dashboard" element={<PlacementDashboard />} />
            <Route path="placements/companies" element={<Companies />} />
            <Route path="placements/drives" element={<PlacementDrives />} />
            <Route path="placements/students" element={<PlacedStudents />} />
            <Route path="placements/success-stories" element={<SuccessStories />} />
            <Route path="placements/hiring-partners" element={<HiringPartners />} />
            <Route path="placements/jobs" element={<JobOpportunities />} />
            <Route path="placements/internships" element={<Internships />} />

            {/* Explore Menu Routes */}
            <Route path="explore" element={<AllExplore />} />
            <Route path="explore/add" element={<AddExplore />} />
            <Route path="explore/edit/:id" element={<AddExplore />} />

            {/* Blog Menu Routes */}
            <Route path="blogs" element={<AllBlogs />} />
            <Route path="blogs/add" element={<AddBlog />} />
            <Route path="blogs/categories" element={<div className="p-6">Blog Categories (Coming Soon)</div>} />
            <Route path="blogs/tags" element={<div className="p-6">Blog Tags (Coming Soon)</div>} />
            <Route path="blogs/comments" element={<div className="p-6">Blog Comments (Coming Soon)</div>} />
            
            {/* About Menu Routes */}
            <Route path="about/manage" element={<ManageAbout />} />
            <Route path="about/team" element={<ManageTeam />} />
            <Route path="about/faqs" element={<ManageFAQs />} />
            <Route path="about/testimonials" element={<ManageTestimonials />} />

            {/* Contact Menu Routes */}
            <Route path="contact/settings" element={<ManageContactSettings />} />
            <Route path="contact/team" element={<ManageSupportTeam />} />
            <Route path="contact/messages" element={<ContactMessages />} />
            <Route path="contact/newsletter" element={<Newsletter />} />

                        {/* Students Management Routes */}
            <Route path="students" element={<AllStudents />} />
            <Route path="students/add" element={<AddStudent />} />
            <Route path="students/edit/:id" element={<AddStudent />} />

            {/* Add more routes here as pages are created */}
            <Route path="*" element={
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-primary mb-2">Coming Soon</h1>
                <p className="text-secondary">This page is under construction.</p>
              </div>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
