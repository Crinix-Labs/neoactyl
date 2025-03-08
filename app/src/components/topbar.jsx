import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = () => {
    return (
        <div className="w-full h-[70px] bg-zinc-900">
            <div className="flex flex-row items-center justify-end py-2 px-4">
                <div className="flex flex-row items-center justify-center gap-4">
                    <div className="avatar avatar-online avatar-placeholder">
                        <div className="bg-zinc-800 text-zinc-100 w-12 rounded-full">
                            <span className="text-xl">CR</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <a href="/login" className="hover:bg-zinc-800/50 rounded-md p-2">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-zinc-100 lucide lucide-log-out"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16 17 21 12 16 7"/>
                            <line x1="21" x2="9" y1="12" y2="12"/>
                        </svg>  
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar;