import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, Users, Activity } from 'lucide-react';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    recentUploads: 0,
    totalViews: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Simulate loading stats
    const timer = setTimeout(() => {
      setStats({
        totalProducts: 24,
        recentUploads: 5,
        totalViews: 1247,
        activeUsers: 89
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Recent Uploads',
      value: stats.recentUploads,
      icon: TrendingUp,
      color: 'bg-[#F97316]',
      change: '+5 this week'
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: Activity,
      color: 'bg-green-500',
      change: '+23%'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: Users,
      color: 'bg-purple-500',
      change: '+8%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-[#0A1F44] to-[#1a3a6b] rounded-lg p-6 text-white">
        <h1 className="text-2xl font-poppins font-bold mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="font-roboto opacity-90">
          Manage your Yantrashilpa Technologies website content and monitor performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-roboto text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-poppins font-bold text-gray-900">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 font-roboto mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-4">
            Recent Products
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Engine Dynamometer Test Rig', date: '2 hours ago' },
              { name: 'Automotive Safety Testing Rig', date: '1 day ago' },
              { name: 'Defence Component Tester', date: '2 days ago' },
              { name: 'Custom Industrial Testing System', date: '3 days ago' }
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-roboto font-medium text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500">{product.date}</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Package size={20} className="text-[#F97316] mr-3" />
                <div>
                  <p className="font-roboto font-medium text-gray-900">Add New Product</p>
                  <p className="text-sm text-gray-500">Upload a new product to showcase</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Activity size={20} className="text-[#F97316] mr-3" />
                <div>
                  <p className="font-roboto font-medium text-gray-900">View Analytics</p>
                  <p className="text-sm text-gray-500">Check website performance</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;