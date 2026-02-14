import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'
import type { Race, RaceResult } from '../types'

export const useRaceStore = defineStore('race', () => {
  const races = ref<Race[]>([])
  const currentRace = ref<Race | null>(null)
  const currentRaceResults = ref<RaceResult[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const upcomingRaces = computed(() => races.value.filter(r => !r.isCompleted))
  const completedRaces = computed(() => races.value.filter(r => r.isCompleted))
  const nextRace = computed(() => upcomingRaces.value[0] || null)

  const setCurrentRace = (race: Race | null) => {
    currentRace.value = race
  }

  const fetchRaces = async (completed?: boolean) => {
    loading.value = true
    error.value = null
    try {
      const params = completed !== undefined ? { completed } : {}
      const response = await api.get<Race[]>('/races', { params })
      races.value = response.data ?? []
    } catch (err: any) {
      error.value = 'Erreur lors du chargement des courses'
      console.error('Error fetching races:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchRaceById = async (raceId: number) => {
    try {
      const response = await api.get<Race>(`/races/${raceId}`)
      currentRace.value = response.data ?? null
      return currentRace.value
    } catch (err: any) {
      console.error('Error fetching race:', err)
      return null
    }
  }

  const fetchRaceResults = async (raceId: number) => {
    try {
      const response = await api.get<RaceResult[]>(`/races/${raceId}/results`)
      currentRaceResults.value = response.data ?? []
    } catch (err: any) {
      console.error('Error fetching race results:', err)
      currentRaceResults.value = []
    }
  }

  const clearCurrentRace = () => {
    currentRace.value = null
    currentRaceResults.value = []
  }

  return {
    races,
    currentRace,
    currentRaceResults,
    loading,
    error,
    upcomingRaces,
    completedRaces,
    nextRace,
    setCurrentRace,
    fetchRaces,
    fetchRaceById,
    fetchRaceResults,
    clearCurrentRace
  }
})
