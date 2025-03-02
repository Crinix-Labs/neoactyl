import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Loginform from './pages/Loginform.jsx'
import ErrorPage from './pages/404.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { themeChange } from 'theme-change'
themeChange()

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
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
