<template>
  <div class="f1-card p-6">
    <h3 class="text-lg font-bold mb-4">Performance de l'Équipe</h3>
    
    <div v-if="performance" class="space-y-4">
      <!-- Total Points -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <span class="text-gray-700 font-medium">Points Total</span>
          <span class="text-2xl font-bold text-f1-red">{{ performance.totalPoints }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-f1-red h-2 rounded-full transition-all"
            :style="{ width: `${Math.min((performance.totalPoints / 500) * 100, 100)}%` }"
          ></div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 gap-4 border-t pt-4">
        <div>
          <p class="text-gray-600 text-xs">Courses</p>
          <p class="text-lg font-bold">{{ performance.racesParticipated }}</p>
        </div>
        <div>
          <p class="text-gray-600 text-xs">Moyenne/Course</p>
          <p class="text-lg font-bold">{{ performance.averagePointsPerRace?.toFixed(1) }}</p>
        </div>
        <div v-if="performance.bestRacePoints">
          <p class="text-gray-600 text-xs">Meilleure Course</p>
          <p class="text-lg font-bold text-green-600">{{ performance.bestRacePoints }}</p>
        </div>
        <div v-if="performance.worstRacePoints">
          <p class="text-gray-600 text-xs">Pire Course</p>
          <p class="text-lg font-bold text-orange-600">{{ performance.worstRacePoints }}</p>
        </div>
      </div>

      <!-- Consistency Score -->
      <div v-if="performance.consistencyScore" class="border-t pt-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-gray-700 font-medium">Indice de Constance</span>
          <span class="text-xl font-bold text-f1-blue">{{ performance.consistencyScore?.toFixed(0) }}/100</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-f1-blue h-2 rounded-full transition-all"
            :style="{ width: `${performance.consistencyScore}%` }"
          ></div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8 text-gray-400">
      <p>Aucune donnée de performance</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TeamPerformance } from '../types'

defineProps<{
  performance?: TeamPerformance
}>()
</script>
