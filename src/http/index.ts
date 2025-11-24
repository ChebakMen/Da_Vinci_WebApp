import axios from "axios";

console.log('Environment variables:', import.meta.env)

const $api = axios.create({
  withCredentials:true,
  baseURL:import.meta.env.VITE_SERVER_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default $api