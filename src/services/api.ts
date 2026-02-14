import axios from 'axios'

// Configuration de base selon l'environnement
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor pour ajouter auth headers du gateway (si disponible)
api.interceptors.request.use((config) => {
  // Token viendra du gateway via cookie/header
  // À adapter selon votre setup OAuth
  return config
})

// Gestion des erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.message)
    return Promise.reject(error)
  }
)

export default api
