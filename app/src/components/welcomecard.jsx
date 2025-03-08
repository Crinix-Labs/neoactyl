import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeCard = () => {
    const navigate = useNavigate();

    return (
        <div className="px-4 py-4 bg-[#202023] h-[150px] border-b-2 border-zinc-700">
        <div className="breadcrumbs text-sm text-white">
          <ul>
            <li>
              <a className="flex items-center gap-2">
                Home
              </a>
            </li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><polyline points="9 18 15 12 9 6"/></svg>
            <li>
              <a className="flex items-center gap-2">
                Dashboard
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-row items-start justify-between">
            <h1 className="text-white text-2xl font-normal font-opensans pt-2">Welcome back, User <br /> <span className="text-zinc-400 text-sm font-opensans">What would you like to do today?</span></h1>
            <a href="/dashboard/create-server" className="flex flex-row items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-4 py-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Create Server
            </a>
        </div>

        </div>
    );
};

export default WelcomeCard;

