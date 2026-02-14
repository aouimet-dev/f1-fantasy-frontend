import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'
import type { Member, MemberTeam } from '../types'

export const useMemberStore = defineStore('member', () => {
  const members = ref<Member[]>([])
  const currentMember = ref<Member | null>(null)
  const currentMemberTeams = ref<MemberTeam[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const setCurrentMember = (member: Member | null) => {
    currentMember.value = member
  }

  const fetchMembers = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get<Member[]>('/members')
      members.value = response.data ?? []
    } catch (err: any) {
      error.value = 'Erreur lors du chargement des membres'
      console.error('Error fetching members:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchMemberTeams = async (memberId: number) => {
    try {
      const response = await api.get<MemberTeam[]>(`/members/${memberId}/teams`)
      currentMemberTeams.value = response.data ?? []
    } catch (err: any) {
      console.error('Error fetching member teams:', err)
      currentMemberTeams.value = []
    }
  }

  const clearCurrentMember = () => {
    currentMember.value = null
    currentMemberTeams.value = []
  }

  return {
    members,
    currentMember,
    currentMemberTeams,
    loading,
    error,
    setCurrentMember,
    fetchMembers,
    fetchMemberTeams,
    clearCurrentMember
  }
})
