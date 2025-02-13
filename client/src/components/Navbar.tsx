import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"
import { FaBars, FaTimes, FaUser } from "react-icons/fa"

interface NavbarProps {
  onMenuButtonClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onMenuButtonClick }) => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/servers"
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Servers
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="flex items-center">
                  <span className="text-gray-600 dark:text-gray-300 text-sm font-medium mr-2">{user.username}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-200 dark:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/servers"
            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Servers
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          {user ? (
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <FaUser className="h-8 w-8 rounded-full text-gray-400" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">{user.username}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="ml-auto bg-gray-200 dark:bg-gray-700 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <div className="px-5 flex flex-col space-y-2">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white bg-indigo-600 hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  )
}

export default Navbar

