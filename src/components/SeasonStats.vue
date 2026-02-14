<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div v-for="stat in stats" :key="stat.label" class="f1-card p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-600 text-sm font-medium">{{ stat.label }}</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">{{ stat.value }}</p>
        </div>
        <div v-if="stat.icon" class="text-4xl" :class="stat.iconColor">
          <i :class="stat.icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Standing, Race } from '../types'

const props = defineProps<{
  standings: Standing[]
  races: Race[]
}>()

const stats = computed(() => {
  const totalParticipants = props.standings.length
  const completedRaces = props.races.filter(r => r.isCompleted).length
  const totalRaces = props.races.length
  const topScorer = props.standings[0]
  const topScore = topScorer?.totalPoints || 0

  return [
    {
      label: 'Participants',
      value: totalParticipants,
      icon: 'pi pi-users',
      iconColor: 'text-f1-blue'
    },
    {
      label: 'Courses Complétées',
      value: `${completedRaces}/${totalRaces}`,
      icon: 'pi pi-check-circle',
      iconColor: 'text-green-600'
    },
    {
      label: 'Points de Tête',
      value: topScore,
      icon: 'pi pi-crown',
      iconColor: 'text-yellow-500'
    },
    {
      label: 'Leader',
      value: topScorer?.memberName || '—',
      icon: 'pi pi-star-fill',
      iconColor: 'text-f1-red'
    }
  ]
})
</script>
