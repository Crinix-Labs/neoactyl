import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import { Home, Settings, Users, ShoppingCart, Coffee, LinkIcon, PlusCircle, Box, Server, Shield } from "lucide-react"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const { logout } = useAuth()

  const menuItems = [
    { icon: Home, text: "Dashboard", link: "/" },
    { icon: Settings, text: "Settings", link: "/settings" },
    { icon: Shield, text: "Admin", link: "/admin" },
    { icon: Users, text: "Users", link: "/users" },
    { icon: ShoppingCart, text: "Shop", link: "/shop" },
    { icon: Coffee, text: "AFK", link: "/afk" },
    { icon: LinkIcon, text: "Linkvertise", link: "/linkvertise" },
    { icon: PlusCircle, text: "Create Server", link: "/create-server" },
    { icon: Box, text: "Eggs", link: "/eggs" },
    { icon: Server, text: "Nodes", link: "/nodes" },
  ]

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
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center px-6 py-2 mt-4 text-gray-600 hover:bg-gray-100 hover:bg-opacity-25 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setOpen(false)}
            >
              <item.icon className="h-6 w-6" />
              <span className="mx-3">{item.text}</span>
            </Link>
          ))}
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

