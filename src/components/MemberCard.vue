<template>
  <div 
    class="f1-card p-6 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
    @click="goToProfile"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3 class="text-xl font-bold text-gray-900">{{ member.name }}</h3>
        <p class="text-sm text-gray-600">{{ member.email || 'Pas d\'email' }}</p>
      </div>
      <div v-if="standing" class="text-right">
        <div class="text-3xl font-bold f1-gradient bg-clip-text text-transparent">
          {{ standing.currentRank }}
        </div>
        <p class="text-xs text-gray-500">Rang</p>
      </div>
    </div>

    <div v-if="standing" class="grid grid-cols-2 gap-4 border-t pt-4">
      <div>
        <p class="text-gray-600 text-xs">Points</p>
        <p class="text-lg font-bold text-f1-red">{{ standing.totalPoints }}</p>
      </div>
      <div>
        <p class="text-gray-600 text-xs">Courses</p>
        <p class="text-lg font-bold">{{ standing.racesCompleted }}</p>
      </div>
      <div>
        <p class="text-gray-600 text-xs">Moy/Course</p>
        <p class="text-lg font-bold">{{ standing.averagePointsPerRace?.toFixed(1) }}</p>
      </div>
      <div v-if="standing.lastRacePoints">
        <p class="text-gray-600 text-xs">Derniers Pts</p>
        <p class="text-lg font-bold text-green-600">+{{ standing.lastRacePoints }}</p>
      </div>
    </div>

    <div v-else class="text-center py-4 text-gray-400">
      Pas encore de standing
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Member, Standing } from '../types'

const props = defineProps<{
  member: Member
  standing?: Standing
}>()

const router = useRouter()

const goToProfile = () => {
  router.push(`/members/${props.member.id}`)
}
</script>
