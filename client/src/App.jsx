import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const { response, setResponse } = useState("");

  useEffect( () => {
    axios.get("/api")
    .then((res) => {
        setResponse(res.data);
    }).catch((err) => {
      console.log(err);
    })
  })
  return(<>
  <h1>Home</h1>
  <h3>res: {response}</h3>
  </>);
}

function About() {
  return <h1>About</h1>;
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/list">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;