import type React from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import axios from "axios"
import ServerCard from "../components/ServerCard"

interface Server {
  id: string
  name: string
  status: "online" | "offline"
  cpu: number
  ram: number
  disk: number
}

const fetchServers = async (): Promise<Server[]> => {
  const response = await axios.get("/api/servers", { withCredentials: true })
  return response.data
}

const DashboardPage: React.FC = () => {
  const { data: servers, isLoading, error } = useQuery<Server[]>(["servers"], fetchServers)

  if (typeof window === "undefined") {
    return null // Return null on server-side
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error has occurred: {(error as Error).message}</div>

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">My Servers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers?.map((server) => (
          <Link to={`/server/${server.id}`} key={server.id}>
            <ServerCard server={server} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage

