import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const { logout } = useAuth()

  return (
    <>
      <motion.div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden ${open ? "block" : "hidden"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpen(false)}
      />
      <motion.div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform ease-in-out duration-300 z-30 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
        initial={false}
        animate={{ x: open ? 0 : "-100%" }}
      >
        <div className="flex items-center justify-center h-16 bg-indigo-500">
          <span className="text-white text-2xl font-semibold">Ptero Dashboard</span>
        </div>
        <nav className="mt-5">
          <Link
            to="/"
            className="flex items-center px-6 py-2 mt-4 text-gray-600 hover:bg-gray-100 hover:bg-opacity-25 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="mx-3">Dashboard</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center px-6 py-2 mt-4 text-gray-600 hover:bg-gray-100 hover:bg-opacity-25 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white w-full text-left"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="mx-3">Logout</span>
          </button>
        </nav>
      </motion.div>
    </>
  )
}

export default Sidebar

