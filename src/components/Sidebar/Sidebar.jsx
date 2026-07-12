import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineSquares2X2,
  HiOutlineAcademicCap,
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineNewspaper,
  HiOutlineFolder,
  HiOutlineStar,
  HiOutlineQuestionMarkCircle,
  HiOutlineInformationCircle,
  HiOutlineEnvelope,
  HiOutlineBell,
  HiOutlineShoppingCart,
  HiOutlineCreditCard,
  HiOutlineTag,
  HiOutlineChartBar,
  HiOutlinePresentationChartLine,
  HiOutlineCog6Tooth,
  HiOutlineUserCircle,
  HiOutlineArrowLeftOnRectangle,
  HiChevronDown,
  HiOutlineChatBubbleLeftEllipsis,
} from 'react-icons/hi2';

const menuItems = [
  { name: 'Dashboard', icon: <HiOutlineHome />, path: '/' },
  { type: 'divider' },
  {
    name: 'Course Management',
    icon: <HiOutlineAcademicCap />,
    path: '/courses',
    children: [
      { name: 'All Courses', path: '/courses' },
      { name: 'Add Course', path: '/courses/add' },
      { name: 'Draft Courses', path: '/courses/draft' },
      { name: 'Featured Courses', path: '/courses/featured' },
    ],
  },
  {
    name: 'Categories',
    icon: <HiOutlineSquares2X2 />,
    path: '/categories',
    children: [
      { name: 'All Categories', path: '/categories' },
      { name: 'Add Category', path: '/categories/add' },
    ],
  },
  {
    name: 'Explore Menu',
    icon: <HiOutlineBookOpen />,
    path: '/explore',
    children: [
      { name: 'Explore List', path: '/explore' },
      { name: 'Add Explore', path: '/explore/add' },
    ],
  },
  {
    name: 'Students',
    icon: <HiOutlineUsers />,
    path: '/students',
    children: [
      { name: 'All Students', path: '/students' },
      { name: 'Enrollments', path: '/enrollments' },
      { name: 'Certificates', path: '/certificates' },
      { name: 'Progress', path: '/students/progress' },
    ],
  },
  {
    name: 'Trainers',
    icon: <HiOutlineUserGroup />,
    path: '/trainers',
    children: [
      { name: 'All Trainers', path: '/trainers' },
      { name: 'Add Trainer', path: '/trainers/add' },
    ],
  },
  {
    name: 'Blog Management',
    icon: <HiOutlineNewspaper />,
    path: '/blogs',
    children: [
      { name: 'All Blogs', path: '/blogs' },
      { name: 'Add Blog', path: '/blogs/add' },
      { name: 'Categories', path: '/blogs/categories' },
      { name: 'Tags', path: '/blogs/tags' },
      { name: 'Comments', path: '/blogs/comments' },
    ],
  },
  {
    name: 'About Management',
    icon: <HiOutlineInformationCircle />,
    path: '/about',
    children: [
      { name: 'Hero & Story', path: '/about/manage' },
      { name: 'Team & Mentors', path: '/about/team' },
      { name: 'Testimonials', path: '/about/testimonials' },
      { name: 'FAQs', path: '/about/faqs' },
    ],
  },
  {
    name: 'Contact Management',
    icon: <HiOutlineChatBubbleLeftEllipsis />,
    path: '/contact',
    children: [
      { name: 'Settings & Address', path: '/contact/settings' },
      { name: 'Support Team', path: '/contact/team' },
      { name: 'Messages / Inquiries', path: '/contact/messages' },
      { name: 'Newsletter', path: '/contact/newsletter' },
    ],
  },
  {
    name: 'Resources',
    icon: <HiOutlineFolder />,
    path: '/resources',
    children: [
      { name: 'Videos', path: '/resources/videos' },
      { name: 'PDFs', path: '/resources/pdfs' },
      { name: 'Links', path: '/resources/links' },
    ],
  },
  {
    name: 'Placements',
    icon: <HiOutlineBriefcase />,
    path: '/placements',
    children: [
      { name: 'Dashboard', path: '/placements/dashboard' },
      { name: 'Companies', path: '/placements/companies' },
      { name: 'Placement Drives', path: '/placements/drives' },
      { name: 'Placed Students', path: '/placements/students' },
      { name: 'Success Stories', path: '/placements/success-stories' },
      { name: 'Hiring Partners', path: '/placements/hiring-partners' },
      { name: 'Job Opportunities', path: '/placements/jobs' },
      { name: 'Internships', path: '/placements/internships' },
    ],
  },
  { name: 'Reviews', icon: <HiOutlineStar />, path: '/reviews' },
  { name: 'FAQ', icon: <HiOutlineQuestionMarkCircle />, path: '/faq' },
  { name: 'Contact', icon: <HiOutlineEnvelope />, path: '/contact' },
  { name: 'Notifications', icon: <HiOutlineBell />, path: '/notifications' },
  { type: 'divider' },
  { name: 'Orders', icon: <HiOutlineShoppingCart />, path: '/orders' },
  { name: 'Payments', icon: <HiOutlineCreditCard />, path: '/payments' },
  { name: 'Coupons', icon: <HiOutlineTag />, path: '/coupons' },
  { type: 'divider' },
  { name: 'Analytics', icon: <HiOutlineChartBar />, path: '/analytics' },
  { name: 'Reports', icon: <HiOutlinePresentationChartLine />, path: '/reports' },
  { type: 'divider' },
  { name: 'Settings', icon: <HiOutlineCog6Tooth />, path: '/settings' },
  { name: 'Profile', icon: <HiOutlineUserCircle />, path: '/profile' },
];

const SidebarItem = ({ item, isCollapsed, activePath }) => {
  const [isOpen, setIsOpen] = useState(activePath.startsWith(item.path) && item.path !== '/');
  
  const hasChildren = item.children && item.children.length > 0;
  const isActive = hasChildren 
    ? activePath.startsWith(item.path) && item.path !== '/' 
    : activePath === item.path;

  if (item.type === 'divider') {
    return <div className="h-px bg-border my-2 mx-4" />;
  }

  const navItemClass = `
    flex items-center justify-between px-3 py-2 mx-3 rounded-xl cursor-pointer transition-all duration-200
    ${isActive 
      ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400 font-semibold' 
      : 'text-secondary hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-text-main dark:hover:text-gray-200 font-medium'
    }
  `;

  const renderContent = () => (
    <>
      <div className="flex items-center gap-3 truncate">
        <span className="text-xl shrink-0">{item.icon}</span>
        {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.name}</span>}
      </div>
      {!isCollapsed && hasChildren && (
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiChevronDown className="text-sm opacity-70" />
        </motion.div>
      )}
    </>
  );

  if (hasChildren) {
    return (
      <div className="mb-1">
        <div className={navItemClass} onClick={() => setIsOpen(!isOpen)}>
          {renderContent()}
        </div>
        <AnimatePresence>
          {isOpen && !isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="ml-9 mr-3 mt-1 pl-3 border-l border-border dark:border-gray-700 space-y-1">
                {item.children.map((child) => (
                  <NavLink
                    key={child.name}
                    to={child.path}
                    className={({ isActive: childActive }) =>
                      `block px-3 py-2 text-sm rounded-lg transition-colors ${
                        childActive
                          ? 'text-primary font-medium bg-primary-light dark:bg-primary/20'
                          : 'text-secondary hover:text-text-main dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    {child.name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <NavLink to={item.path} className={`mb-1 block ${navItemClass}`}>
      {renderContent()}
    </NavLink>
  );
};

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-background dark:bg-gray-900 border-r border-border dark:border-gray-800 flex flex-col transition-all duration-300 z-40
        ${isCollapsed ? 'w-20' : 'w-[280px]'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border dark:border-gray-800 shrink-0">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-lg">N</span>
        </div>
        {!isCollapsed && (
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="ml-3 font-bold text-xl tracking-tight text-text-main dark:text-white"
          >
            NextSkool
          </motion.span>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-4 no-scrollbar">
        {menuItems.map((item, idx) => (
          <SidebarItem 
            key={item.name || idx} 
            item={item} 
            isCollapsed={isCollapsed} 
            activePath={location.pathname} 
          />
        ))}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-border dark:border-gray-800 shrink-0 bg-background dark:bg-gray-900">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-200">
          <HiOutlineArrowLeftOnRectangle className="text-xl shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
