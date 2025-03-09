import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../components/title";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      const res = await axios.post("/api/login", { username, password });
      if (res.data.success) {
        navigate("/dashboard");
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
      <div className="p-8 rounded-lg shadow-md w-96 border-2 border-zinc-800 border-dashed">
        <Title />
        <h1 className="text-2xl font-semibold text-center mb-2 text-white">👋 Welcome to Neoactyl</h1>
        <p className="text-white text-center mb-6 text-sm">Login or create an account</p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block text-white mb-1">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30"
            required
            className="w-full p-2 bg-zinc-800 text-white rounded mb-4"
          />

          <label className="block text-white mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            minLength="8"
            required
            className="w-full p-2 bg-zinc-800 text-white rounded mb-4"
          />

          <button type="submit" className="w-full p-2 bg-zinc-800 text-white rounded hover:bg-zinc-700">
            Login
          </button>
        </form>

        <p className="text-white text-sm text-center mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-600">Register</Link>
        </p>

        <div className="flex items-center justify-center my-4">
          <div className="w-1/3 border-b border-zinc-700"></div>
          <p className="mx-2 text-zinc-100 text-sm">OR</p>
          <div className="w-1/3 border-b border-zinc-700"></div>
        </div>

        <a href="/dashboard" className="flex items-center justify-center p-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 w-full mb-2">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/discord.svg" alt="Discord" className="h-5 w-5 mr-2 invert" />
          Login with Discord
        </a>

        <a href="/dashboard" className="flex items-center justify-center p-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 w-full">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/google.svg" alt="Google" className="h-5 w-5 mr-2 invert" />
          Login with Google
        </a>
      </div>
    </div>
  );
};

export default Login;
