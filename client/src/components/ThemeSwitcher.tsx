import type React from "react"
import { useTheme } from "../context/ThemeContext"
import { Sun, Moon, Monitor } from "lucide-react"

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full ${theme === "light" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
        aria-label="Light theme"
      >
        <Sun className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full ${theme === "dark" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
        aria-label="Dark theme"
      >
        <Moon className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-full ${theme === "system" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
        aria-label="System theme"
      >
        <Monitor className="h-5 w-5" />
      </button>
    </div>
  )
}

export default ThemeSwitcher

