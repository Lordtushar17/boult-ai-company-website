import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plus, 
  Package, 
  LogOut, 
  ChevronLeft,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      exact: true
    },
    {
      path: '/admin/dashboard/add-product',
      icon: Plus,
      label: 'Add Product'
    },
    {
      path: '/admin/dashboard/manage-products',
      icon: Package,
      label: 'Manage Products'
    }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-[#0A1F44] text-white transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#F97316] rounded-full flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          {isOpen && (
            <div className="ml-3">
              <h2 className="font-poppins font-bold text-lg">Admin Panel</h2>
              <p className="text-xs text-gray-300">Yantrashilpa Tech</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#F97316] text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  {isOpen && (
                    <span className="ml-3 font-roboto font-medium">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200"
        >
          <LogOut size={20} />
          {isOpen && (
            <span className="ml-3 font-roboto font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;