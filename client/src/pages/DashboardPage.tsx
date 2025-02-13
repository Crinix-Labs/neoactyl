import type React from "react"
import { Link } from "react-router-dom"
import ServerCard from "../components/ServerCard"

interface Server {
  id: string
  name: string
  status: "online" | "offline"
  cpu: number
  ram: number
  disk: number
}

const staticServers: Server[] = [
  { id: "1", name: "Server 1", status: "online", cpu: 25, ram: 40, disk: 60 },
  { id: "2", name: "Server 2", status: "offline", cpu: 0, ram: 0, disk: 55 },
  { id: "3", name: "Server 3", status: "online", cpu: 80, ram: 70, disk: 90 },
]

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">My Servers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staticServers.map((server) => (
          <Link to={`/server/${server.id}`} key={server.id}>
            <ServerCard server={server} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage

