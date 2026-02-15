import { ref, computed } from 'vue'
import api from '../services/api'
import type { Standing, StandingsHistory } from '../types'

export const useStandings = () => {
  const standings = ref<Standing[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchStandings = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get<Standing[]>('/standings')
      standings.value = response.data ?? []
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des standings'
      console.error('Error fetching standings:', err)
    } finally {
      loading.value = false
    }
  }

  const getStandingByMemberId = async (memberId: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get<Standing>(`/standings/${memberId}`)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement du standing'
      console.error('Error fetching standing:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const getStandingsHistory = async (memberId: number) => {
    try {
      const response = await api.get<StandingsHistory[]>(`/standings/history/${memberId}`)
      return response.data ?? []
    } catch (err: any) {
      console.error('Error fetching standings history:', err)
      return []
    }
  }

  const topStandings = computed(() => standings.value.slice(0, 5))

  return {
    standings,
    loading,
    error,
    fetchStandings,
    getStandingByMemberId,
    getStandingsHistory,
    topStandings
  }
}
