import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginimg from '../../public/assets/loginimg.png';
import logo from '../../public/assets/logo.png';
import Title from '../components/title';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      // For demo purposes - replace with actual auth
      navigate('/dashboard');
    } else {
      setError('Please enter both username and password');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
   
      <div className="flex flex-col items-center justify-center min-h-screen">
      <Title />
      <div className="p-8 rounded-lg shadow-md w-96 border-2 border-zinc-800 border-dashed">
        <h1 className="text-2xl font-semibold text-center mb-2 font-openSans text-white">👋 welcome to Neoactyl</h1>
        <p className="text-white text-center mb-6 font-openSans text-sm">Login or get started by creating an account</p>
        <form>
        <p className="text-white">Username</p>
        <label className="input validator bg-zinc-800 mb-4">
        <svg className="h-[1em] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="white"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>            <input id="username" type="input" required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" className="input-bordered text-white placeholder-gray-400" />
        </label>
        <p className="text-white">Password</p>
        <label className="input validator bg-zinc-800">
            <svg className="h-[1em] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
            <input id="password" type="password" required placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" className="text-white bg-zinc-800 placeholder-gray-400" />
        </label>
        </form>
        <div className="flex flex-col items-center justify-center pt-6">
            <a href="/dashboard" className="hover:bg-zinc-700 px-4 py-2 rounded-md bg-zinc-800 text-white w-full text-center">Login</a>
            <p className="text-white font-openSans text-sm pt-2">Dont have an account? <Link to="/register" className="text-blue-500 hover:text-blue-600">Register</Link></p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="divider text-zinc-100 before:bg-zinc-700 after:bg-zinc-700 font-openSans text-sm">OR</div>
        </div>
        <div className="flex flex-row items-center justify-center pt-2">
            <a href="/dashboard" className="flex flex-row items-center justify-center hover:bg-zinc-700 px-4 py-2 rounded-md bg-zinc-800 text-white w-full text-center gap-2"> 
            <img height="20" width="20" src="https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/discord.svg" className="mr-2 invert brightness-200"/>
            Login with Discord</a>
        </div>
        <div className="flex flex-row items-center justify-center pt-2">
            <a href="/dashboard" className="flex flex-row items-center justify-center hover:bg-zinc-700 px-4 py-2 rounded-md bg-zinc-800 text-white w-full text-center gap-2"> 
            <img height="20" width="20" src="https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/google.svg" className="mr-2 invert brightness-200"/>
            Login with Google</a>
        </div>
      </div>
      
    </div>
    </div>
  );
};

export default Login;