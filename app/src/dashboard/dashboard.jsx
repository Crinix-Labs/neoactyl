import React from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import { useNavigate } from 'react-router-dom';
import WelcomeCard from '../components/welcomecard';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <WelcomeCard />
        <div className="flex flex-row justify-start items-center px-4 bg-[#202023] h-[140px] border-b border-zinc-700">
          <div className="flex justify-center items-center gap-4 border-r border-zinc-700 h-full pr-[100px]">
            <div className="flex flex-col items-start justify-center pl-4">
              <h1 className="flex flex-row items-center gap-2 text-zinc-400 text-start text-md font-opensans font-light"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-memory-stick"><path d="M6 19v-3"/><path d="M10 19v-3"/><path d="M14 19v-3"/><path d="M18 19v-3"/><path d="M8 11V9"/><path d="M16 11V9"/><path d="M12 11V9"/><path d="M2 15h20"/><path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z"/></svg> Available Memory</h1>
              <h2 className="text-white text-center text-[50px] font-opensans font-light">0.00 GB</h2>
            </div>
          </div>
            <div className="flex justify-center items-center gap-4 border-r border-zinc-700 h-full pr-[100px]">
            <div className="flex flex-col items-start justify-center pl-8">
              <h1 className="flex flex-row items-center gap-2 text-zinc-400 text-start text-md font-opensans font-light"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hard-drive"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg> Available Storage</h1>
              <h2 className="text-white text-center text-[50px] font-opensans font-light">0.00 GB</h2>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 h-full">
            <div className="flex flex-col items-start justify-center pl-8">
              <h1 className="flex flex-row items-center gap-2 text-zinc-400 text-start text-md font-opensans font-light"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cpu"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg> Available CPU</h1>
              <h2 className="text-white text-center text-[50px] font-opensans font-light">0 Cores</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start px-2 pt-6 h-[150px] border-b border-zinc-700">
          <div className="flex flex-col items-start justify-center pl-4">
            <h1 className="text-zinc-100 text-start text-[20px] font-opensans font-medium">Your Servers</h1>
            <p className="text-zinc-400 text-sm font-opensans">Manage your servers here</p>
          </div>
          <div className="flex flex-row items-start justify-between pl-4 pt-10 gap-[400px]">
              <h1 className="text-zinc-100 text-start text-[16px] font-opensans font-medium">Name</h1>
              <h1 className="text-zinc-100 text-start text-[16px] font-opensans font-medium">Status</h1>
              <h1 className="text-zinc-100 text-start text-[16px] font-opensans font-medium">Actions</h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center px-2 pt-6">
          <div className="flex flex-row items-start justify-between pl-4 pt-2">
            <p className="flex flex-row items-center gap-2 text-zinc-100 text-start text-[16px] font-opensans font-light"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkle"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
              No servers found
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
