import React from 'react';
import Title from './title';
import Loader from './loader';
import '../assets/loader.css'



const Loading = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-zinc-900 backdrop-blur-sm z-50">
            <Title />
            <div className="mt-4">
                <Loader />
            </div>
        </div>
    );
};

export default Loading;

