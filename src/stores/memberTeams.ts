import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AuthUser } from '@/services/auth'
import { resolveMemberIdForUser } from '@/services/member'
import { createMemberTeam, getMemberTeams, type MemberTeam } from '@/services/memberTeams'

export const useMemberTeamsStore = defineStore('memberTeams', () => {
    const teams = ref<MemberTeam[]>([])

    const loadTeamsForUser = async (user: AuthUser) => {
        const memberId = await resolveMemberIdForUser(user)
        const memberTeams = await getMemberTeams(memberId)
        teams.value = memberTeams.sort((left, right) => left.teamOrder - right.teamOrder)
    }

    const createTeamForUser = async (user: AuthUser, teamName: string) => {
        const memberId = await resolveMemberIdForUser(user)
        const createdTeam = await createMemberTeam(memberId, {
            teamName,
            teamOrder: teams.value.length + 1
        })

        teams.value = [...teams.value, createdTeam].sort((left, right) => left.teamOrder - right.teamOrder)
    }

    return {
        teams,
        loadTeamsForUser,
        createTeamForUser
    }
})
