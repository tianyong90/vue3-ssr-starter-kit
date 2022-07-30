import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const createAxios = () => {
  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
  })

  // axiosInstance.interceptors.request.use((config) => {
  //   // config.headers['Authorization'] = `Bearer ${process.env.VITE_API_TOKEN}`
  //
  //   return config
  // })

  axiosInstance.interceptors.response.use((res) => {
    return res.data
  })

  return axiosInstance
}

export const http = createAxios()
