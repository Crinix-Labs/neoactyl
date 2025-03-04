import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { themeChange } from 'theme-change'
themeChange()
import './index.css'
import App from './App.jsx'
import Loginform from './pages/Loginform.jsx'
import ErrorPage from './pages/404.jsx'
import Admingreeting from './pages/admin/welcome.jsx'
import Userdashboard from './pages/dashboard.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    errorElement: <ErrorPage/>,
  },
  {
    path:"/admin/greeting",
    element: <Admingreeting />,
    errorElement: <ErrorPage/>,
  },
  {
    path:"/dashboard",
    element: <Userdashboard />,
    errorElement: <ErrorPage/>,
  },
  {
    path:"/auth",
    element: <Loginform />
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
<RouterProvider router={router}/>
  </StrictMode>,
)
