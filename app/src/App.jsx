import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Login from './auth/login'
import Dashboard from './dashboard/dashboard'
import Register from './auth/register'
import Loading from './components/loading'

const LoadingWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]); 

  return (
    <>
      {loading && <Loading />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <LoadingWrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </LoadingWrapper>
    </Router>
  )
}

export default App
