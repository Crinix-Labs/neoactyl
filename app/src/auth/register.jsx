import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginimg from '../../public/assets/loginimg.png';
import logo from '../../public/assets/logo.png';
import Title from '../components/title';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    return (
        <div className="flex flex-col items-center justify-center bg-zinc-900">
            <div className="flex flex-col items-center justify-center min-h-screen">
            <Title />
                <div className="px-6 py-4 rounded-lg shadow-md w-96 border-2 border-zinc-800 border-dashed">
                    <h1 className="text-white text-center text-2xl mb-2 font-bold">Register</h1>
                    <p className="text-white text-center text-sm mb-4">Fill the form below to create an account</p>
                    <form>
                    <p className="text-white">Username</p>
                    <label className="input validator bg-zinc-800 mb-4 rounded-md w-full">
                        <svg className="h-[1em] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="white"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>          
                        <input id="username" type="input" required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" className="input-bordered text-white placeholder-gray-400" />
                    </label>
                    <p className="text-white">Email</p>
                    <label className="input validator bg-zinc-800 mb-4 rounded-md w-full">
                        <svg className="h-[1em] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                        <input id="email" type="email" placeholder="mail@site.com" required className="text-white bg-zinc-800 placeholder-gray-400"/>
                    </label>
                    <div className="validator-hint hidden">Enter valid email address</div>
                    <p className="text-white">Password</p>
                    <label className="input validator bg-zinc-800 mb-4 rounded-md w-full">
                        <svg className="h-[1em] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                        <input id="password" type="password" required placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" className="text-white bg-zinc-800 placeholder-gray-400" />
                    </label>
                    </form>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-white text-center font-openSans text-sm pb-2">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link></p>
                        <a href="/dashboard" className="hover:bg-zinc-700 px-4 py-2 rounded-md bg-zinc-800 text-white w-full text-center">Register</a>
                        <p className="text-white text-center font-openSans text-sm pt-4">By clicking register, you agree to the <Link to="/terms" className="text-blue-500 hover:text-blue-600">Terms of Service</Link> and <Link to="/privacy" className="text-blue-500 hover:text-blue-600">Privacy Policy</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;