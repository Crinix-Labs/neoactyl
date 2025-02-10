<<<<<<< HEAD
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

function Home() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    axios
      .get("/api")
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h1>Home</h1>
      <h3 className="bg-dark">res: {response.message}</h3>
    </>
  );
}

function About() {
  return <h1>About</h1>;
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);
>>>>>>> 509f58bcc18da08c4bd5e06ca912f64c2d0f2153

export default App;
