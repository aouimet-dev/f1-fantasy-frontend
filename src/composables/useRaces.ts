import { ref } from 'vue'
import api from '../services/api'
import type { Race, RaceResult } from '../types'

export const useRaces = () => {
  const races = ref<Race[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchRaces = async (completed?: boolean) => {
    loading.value = true
    error.value = null
    try {
      const params = completed !== undefined ? { completed } : {}
      const response = await api.get<Race[]>('/races', { params })
      races.value = response.data ?? []
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des courses'
      console.error('Error fetching races:', err)
    } finally {
      loading.value = false
    }
  }

  const getRaceById = async (raceId: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get<Race>(`/races/${raceId}`)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement de la course'
      console.error('Error fetching race:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const getRaceResults = async (raceId: number) => {
    try {
      const response = await api.get<RaceResult[]>(`/races/${raceId}/results`)
      return response.data ?? []
    } catch (err: any) {
      console.error('Error fetching race results:', err)
      return []
    }
  }

  const getRaceStandings = async (raceId: number) => {
    try {
      const response = await api.get(`/races/${raceId}/standings`)
      return response.data ?? []
    } catch (err: any) {
      console.error('Error fetching race standings:', err)
      return []
    }
  }

  return {
    races,
    loading,
    error,
    fetchRaces,
    getRaceById,
    getRaceResults,
    getRaceStandings
  }
}
