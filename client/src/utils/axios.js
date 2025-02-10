import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://s7l.project.crinix.us.kg:3000/',
  withCredentials: true, // Enables cookies
});
