import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"

interface Server {
  id: string
  name: string
  status: "online" | "offline"
  cpu: number
  ram: number
  disk: number
}

const fetchServer = async (id: string): Promise<Server> => {
  const response = await axios.get(`/api/servers/${id}`, { withCredentials: true })
  return response.data
}

const ServerControlPanel: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [logs, setLogs] = useState<string[]>([])
  const { data: server, isLoading, error } = useQuery<Server>(["server", id], () => fetchServer(id!))

  const powerMutation = useMutation((action: "start" | "stop" | "restart") =>
    axios.post(`/api/servers/${id}/power`, { action }, { withCredentials: true }),
  )

  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      const ws = new WebSocket(`ws://your-websocket-url/server/${id}`)
      ws.onmessage = (event) => {
        setLogs((prevLogs) => [...prevLogs, event.data])
      }
      return () => {
        ws.close()
      }
    }
  }, [id])

  if (typeof window === "undefined") {
    return null // Return null on server-side
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error has occurred: {(error as Error).message}</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{server?.name}</h1>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Server Stats</h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    server?.status === "online" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {server?.status}
                </span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">CPU Usage</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{server?.cpu}%</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">RAM Usage</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{server?.ram}%</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Disk Usage</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{server?.disk}%</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => powerMutation.mutate("start")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Start
        </button>
        <button
          onClick={() => powerMutation.mutate("stop")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Stop
        </button>
        <button
          onClick={() => powerMutation.mutate("restart")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Restart
        </button>
      </div>
      <div className="bg-black rounded-lg p-4 h-64 overflow-auto">
        <h3 className="text-lg font-medium text-white mb-2">Console</h3>
        {logs.map((log, index) => (
          <div key={index} className="text-green-400 font-mono text-sm">
            {log}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServerControlPanel

