<template>
  <div 
    class="f1-card p-6 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
    @click="goToTeamDetails"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3 class="text-xl font-bold text-gray-900 line-clamp-2">{{ team.teamName }}</h3>
        <p class="text-sm text-gray-600">{{ team.member.name }}</p>
      </div>
      <div>
        <TeamBadge :teamName="team.teamName" />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 border-t pt-4">
      <div>
        <p class="text-gray-600 text-xs">Équipe</p>
        <p class="text-lg font-bold">{{ team.teamOrder }}</p>
      </div>
      <div>
        <p class="text-gray-600 text-xs">Depuis</p>
        <p class="text-sm text-gray-700">{{ formatDate(team.createdAt) }}</p>
      </div>
    </div>

    <div class="mt-4 pt-4 border-t">
      <button class="w-full py-2 bg-f1-red text-white rounded font-semibold hover:bg-red-700 transition-colors text-sm">
        Voir Détails
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFormatting } from '../composables/useFormatting'
import TeamBadge from './TeamBadge.vue'
import type { MemberTeam } from '../types'

const props = defineProps<{
  team: MemberTeam
}>()

const router = useRouter()
const { formatDate } = useFormatting()

const goToTeamDetails = () => {
  router.push(`/members/${props.team.member.id}/teams/${props.team.id}`)
}
</script>
