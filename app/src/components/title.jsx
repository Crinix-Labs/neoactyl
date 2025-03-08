import React from 'react';
import logo from '../../public/assets/logo.png';
const Title = () => {
    return (
        <header className="flex items-center justify-center px-4 py-2">
            <img src={logo} alt="logo" className="w-[300px] mr-2"/>
        </header>
    )
}    

export default Title;