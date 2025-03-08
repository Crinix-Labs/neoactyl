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
                </div>
            </div>
        </div>
    )
}

export default Topbar;