import axios from "axios"

const pterodactylApi = axios.create({
  baseURL: process.env.PTERODACTYL_API_URL,
})

export async function authenticatePterodactyl(apiKey: string): Promise<boolean> {
  try {
    const response = await pterodactylApi.get("/api/client", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    return response.status === 200
  } catch (error) {
    return false
  }
}

export async function getServers(apiKey: string) {
  const response = await pterodactylApi.get("/api/client", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
  return response.data.data
}

export async function getServerDetails(apiKey: string, serverId: string) {
  const response = await pterodactylApi.get(`/api/client/servers/${serverId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
  return response.data.attributes
}

export async function powerServer(apiKey: string, serverId: string, action: string) {
  await pterodactylApi.post(
    `/api/client/servers/${serverId}/power`,
    {
      signal: action,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  )
}

