<template>
  <div class="f1-card p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">Résultats de la Course</h2>
    
    <div v-if="loading" class="py-4">
      <LoadingSpinner message="Chargement des résultats..." />
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-3 text-left font-semibold text-gray-900">Pos</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-900">Équipe</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-900">Membre</th>
            <th class="px-4 py-3 text-right font-semibold text-gray-900">Points</th>
            <th class="px-4 py-3 text-center font-semibold text-gray-900">Entrés</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(result, idx) in sortedResults" 
            :key="result.raceResultId"
            class="border-t hover:bg-gray-50 cursor-pointer"
            @click="goToTeam(result.memberTeamId, result.memberName)"
          >
            <td class="px-4 py-3 font-bold text-lg">{{ idx + 1 }}</td>
            <td class="px-4 py-3">
              <TeamBadge :teamName="result.teamName" />
            </td>
            <td class="px-4 py-3 font-medium text-f1-blue">{{ result.memberName }}</td>
            <td class="px-4 py-3 text-right font-bold text-lg">{{ result.points }}</td>
            <td class="px-4 py-3 text-center text-gray-600 text-xs">
              {{ formatDateTime(result.enteredAt) }}
            </td>
          </tr>
          <tr v-if="sortedResults.length === 0" class="border-t">
            <td colspan="5" class="px-4 py-8 text-center text-gray-400">
              Aucun résultat disponible
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFormatting } from '../composables/useFormatting'
import TeamBadge from './TeamBadge.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import type { RaceResult } from '../types'

const props = defineProps<{
  results: RaceResult[]
  loading?: boolean
}>()

const router = useRouter()
const { formatDateTime } = useFormatting()

const sortedResults = computed(() => {
  return [...props.results].sort((a, b) => b.points - a.points)
})

const goToTeam = (teamId: number, memberName: string) => {
  // Navigation vers équipe (sera implémenté)
  console.log('Navigate to team:', teamId, memberName)
}
</script>
