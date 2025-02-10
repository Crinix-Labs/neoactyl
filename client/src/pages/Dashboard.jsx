import React from 'react';
import UserProfile from '../components/UserProfile';

export default Dashboard;
export const Dashboard = () => (
  <div className="h-screen flex justify-center items-center">
    <UserProfile />
  </div>
);
