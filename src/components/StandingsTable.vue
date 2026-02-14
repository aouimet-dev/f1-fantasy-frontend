<template>
  <div class="f1-card p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-gray-900">Classement Global</h2>
      <button 
        @click="refresh"
        :disabled="loading"
        class="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        title="Rafraîchir"
      >
        <i class="pi pi-refresh" :class="{ 'animate-spin': loading }"></i>
      </button>
    </div>

    <ErrorAlert 
      v-if="error" 
      title="Erreur" 
      :message="error"
    />

    <div v-if="loading && standings.length === 0" class="py-4">
      <LoadingSpinner message="Chargement des standings..." />
    </div>
    
    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-3 text-left font-semibold text-gray-900">Rang</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-900">Membre</th>
            <th class="px-4 py-3 text-right font-semibold text-gray-900">Points</th>
            <th class="px-4 py-3 text-center font-semibold text-gray-900">Courses</th>
            <th class="px-4 py-3 text-right font-semibold text-gray-900">Moy/C</th>
            <th class="px-4 py-3 text-right font-semibold text-gray-900">Derniers Pts</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="standing in standings" 
            :key="standing.memberId" 
            class="border-t hover:bg-gray-50 cursor-pointer transition-colors"
            @click="goToProfile(standing.memberId)"
          >
            <td class="px-4 py-3">
              <RankChangeIndicator :rank="standing.currentRank" :rankChange="standing.rankChange || 0" />
            </td>
            <td class="px-4 py-3 font-medium text-f1-blue">{{ standing.memberName }}</td>
            <td class="px-4 py-3 text-right font-bold text-lg">{{ standing.totalPoints }}</td>
            <td class="px-4 py-3 text-center">{{ standing.racesCompleted }}</td>
            <td class="px-4 py-3 text-right">{{ standing.averagePointsPerRace?.toFixed(1) || '—' }}</td>
            <td class="px-4 py-3 text-right">
              <span v-if="standing.lastRacePoints" class="font-semibold">
                +{{ standing.lastRacePoints }}
              </span>
              <span v-else class="text-gray-400">—</span>
            </td>
          </tr>
          <tr v-if="standings.length === 0" class="border-t">
            <td colspan="6" class="px-4 py-8 text-center text-gray-400">
              Aucun standing disponible
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStandings } from '../composables/useStandings'
import RankChangeIndicator from './RankChangeIndicator.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorAlert from './ErrorAlert.vue'

const router = useRouter()
const { standings, loading, error, fetchStandings } = useStandings()

const refresh = async () => {
  await fetchStandings()
}

const goToProfile = (memberId: number) => {
  router.push(`/members/${memberId}`)
}

onMounted(async () => {
  await fetchStandings()
})
</script>
