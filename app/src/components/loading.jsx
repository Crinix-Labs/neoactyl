import React from 'react';
import Title from './title';

const Loading = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-zinc-900 backdrop-blur-sm z-50">
            <Title />
            <div className="mt-4">
                <span className="loading loading-spinner loading-xl text-zinc-100"></span>
            </div>
        </div>
    );
};

export default Loading;

