import axios, { AxiosInstance } from 'axios';
import { config } from '../config/config';

export class PterodactylService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${config.pterodactyl.url}/api/application`,
      headers: {
        'Authorization': `Bearer ${config.pterodactyl.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }

  async getServers() {
    try {
      const response = await this.api.get('/servers');
      return response.data;
    } catch (error) {
      console.error('Error fetching servers:', error);
      throw new Error('Failed to fetch servers from Pterodactyl');
    }
  }

  async powerAction(serverId: string, action: 'start' | 'stop' | 'restart') {
    try {
      const response = await this.api.post(`/servers/${serverId}/power`, {
        signal: action
      });
      return response.data;
    } catch (error) {
      console.error(`Error executing power action ${action}:`, error);
      throw new Error(`Failed to execute power action ${action}`);
    }
  }

  async getServerStats(serverId: string) {
    try {
      const response = await this.api.get(`/servers/${serverId}/resources`);
      return response.data;
    } catch (error) {
      console.error('Error fetching server stats:', error);
      throw new Error('Failed to fetch server statistics');
    }
  }

  async getResources() {
    try {
      const response = await this.api.get('/resources');
      return response.data;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw new Error('Failed to fetch system resources');
    }
  }
}

export const pterodactylService = new PterodactylService();
