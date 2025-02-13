import type React from "react"

interface ServerCardProps {
  server: {
    id: string
    name: string
    status: "online" | "offline"
    cpu: number
    ram: number
    disk: number
  }
}

const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{server.name}</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-300">
          <p>
            Status:{" "}
            <span className={`font-semibold ${server.status === "online" ? "text-green-500" : "text-red-500"}`}>
              {server.status}
            </span>
          </p>
        </div>
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center">
          <div className="mb-2 sm:mb-0 sm:mr-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">CPU</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{server.cpu}%</p>
          </div>
          <div className="mb-2 sm:mb-0 sm:mr-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">RAM</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{server.ram}%</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Disk</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{server.disk}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServerCard

