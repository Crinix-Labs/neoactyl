import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api")
      .then((res) => {
        setResponse(res.data.message);
      })
      .catch((err) => {
        console.error("API call failed: ", err);
        setError("Failed to load data");
      });
  }, []);

  return (
    <>
      <h1>Home</h1>
      {error ? <h3>Error: {error}</h3> : <h3>Response: {response}</h3>}
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

export default App;
