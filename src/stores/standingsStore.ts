import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'
import type { Standing, StandingsHistory } from '../types'

export const useStandingsStore = defineStore('standings', () => {
  const standings = ref<Standing[]>([])
  const standingsHistory = ref<StandingsHistory[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastUpdated = ref<Date | null>(null)

  const topThree = computed(() => standings.value.slice(0, 3))

  const getMemberStanding = (memberId: number) => {
    return standings.value.find(s => s.memberId === memberId)
  }

  const fetchStandings = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get<Standing[]>('/standings')
      standings.value = response.data ?? []
      lastUpdated.value = new Date()
    } catch (err: any) {
      error.value = 'Erreur lors du chargement des standings'
      console.error('Error fetching standings:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchStandingsHistory = async (memberId: number) => {
    try {
      const response = await api.get<StandingsHistory[]>(`/standings/history/${memberId}`)
      standingsHistory.value = response.data ?? []
    } catch (err: any) {
      console.error('Error fetching standings history:', err)
      standingsHistory.value = []
    }
  }

  const refreshStandings = async () => {
    // Petit délai pour éviter trop de requêtes
    if (lastUpdated.value && Date.now() - lastUpdated.value.getTime() < 5000) {
      return
    }
    await fetchStandings()
  }

  return {
    standings,
    standingsHistory,
    loading,
    error,
    lastUpdated,
    topThree,
    getMemberStanding,
    fetchStandings,
    fetchStandingsHistory,
    refreshStandings
  }
})
