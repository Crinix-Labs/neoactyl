import React from 'react';
import Title from './title';

const Loading = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-zinc-900 backdrop-blur-sm z-50">
            <Title />
            <div className="mt-4 flex flex-col items-center justify-center">
                <span className="loading loading-spinner loading-xl text-zinc-100"></span>
                <p className="flex flex-col items-center justify-center text-white text-sm font-opensans font-light pt-6">Hold on tight, we're almost there! <br /> <span className="text-zinc-100 text-sm font-opensans pt-4">Neoactyl Alpha © 2025-2026</span></p>
            </div>
        </div>
    );
};

export default Loading;

