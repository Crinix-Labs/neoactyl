import React from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <div className="px-4 py-4">
        <div className="breadcrumbs text-sm">
          <ul>
            <li><a href="/dashboard">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
          </ul>
        </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
