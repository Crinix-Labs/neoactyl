import React from 'react';

const Footer = () => {
    return (
        <div className="flex flex-row items-center justify-between w-full h-[50px] min-h-[50px] bg-zinc-900 border-t border-zinc-700 px-6">
            <p className="text-zinc-100 text-sm font-opensans font-light">Build 1.0</p>
            <p className="text-zinc-100 text-sm font-opensans font-light">Neoactyl Alpha © 2025-2026</p>
            <a href="https://github.com/Crinix-Labs/neoactyl" className="ml-2">
            <img height="25" width="25" src="https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/github.svg" className="invert brightness-200"/>
            </a>
        </div>
    );
};

export default Footer;
