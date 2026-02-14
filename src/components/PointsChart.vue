<template>
  <div class="f1-card p-6">
    <h3 class="text-lg font-bold mb-4">Progression des Points</h3>
    <div v-if="chartData" class="flex justify-center">
      <canvas ref="chartCanvas" width="300" height="150"></canvas>
    </div>
    <div v-else class="flex items-center justify-center h-40 text-gray-400">
      <p>Aucune donnée disponible</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  standingsHistory?: Array<any>
  chartData?: Array<any>
}>()

const chartCanvas = ref<HTMLCanvasElement | null>(null)

watch(() => props.chartData, () => {
  // Graphique sera implémenté avec Chart.js ou similar
  // Pour maintenant, on laisse juste le placeholder
}, { deep: true })
</script>
