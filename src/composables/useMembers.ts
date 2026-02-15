import { ref } from 'vue'
import api from '../services/api'
import type { Member, MemberTeam, RaceResult, TeamPerformance } from '../types'

export const useMembers = () => {
  const members = ref<Member[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchMembers = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get<Member[]>('/members')
      members.value = response.data ?? []
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des membres'
      console.error('Error fetching members:', err)
    } finally {
      loading.value = false
    }
  }

  const getMemberById = async (memberId: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get<Member>(`/members/${memberId}`)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement du membre'
      console.error('Error fetching member:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const getMemberTeams = async (memberId: number) => {
    try {
      const response = await api.get<MemberTeam[]>(`/members/${memberId}/teams`)
      return response.data ?? []
    } catch (err: any) {
      console.error('Error fetching member teams:', err)
      return []
    }
  }

  const getTeamResults = async (memberId: number, teamId: number) => {
    try {
      const response = await api.get<RaceResult[]>(`/members/${memberId}/teams/${teamId}/results`)
      return response.data ?? []
    } catch (err: any) {
      console.error('Error fetching team results:', err)
      return []
    }
  }

  const getTeamPerformance = async (memberId: number, teamId: number) => {
    try {
      const response = await api.get<TeamPerformance>(`/members/${memberId}/teams/${teamId}/performance`)
      return response.data
    } catch (err: any) {
      console.error('Error fetching team performance:', err)
      return null
    }
  }

  return {
    members,
    loading,
    error,
    fetchMembers,
    getMemberById,
    getMemberTeams,
    getTeamResults,
    getTeamPerformance
  }
}
