<template>
  <div 
    class="f1-card p-6 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
    @click="navigate"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <div class="text-sm font-semibold text-f1-red">Race {{ race.raceNumber }}</div>
        <h3 class="text-xl font-bold text-gray-900 line-clamp-2">{{ race.raceName }}</h3>
        <p class="text-sm text-gray-600">{{ race.circuitName }}, {{ race.country }}</p>
      </div>
      <div class="ml-2">
        <div v-if="race.isCompleted" class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold whitespace-nowrap">
          ✓ Complétée
        </div>
        <div v-else class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold whitespace-nowrap">
          À venir
        </div>
      </div>
    </div>
    
    <div class="flex items-center justify-between text-sm border-t pt-3">
      <div class="text-gray-600 flex items-center gap-2">
        <i class="pi pi-calendar text-sm"></i>
        {{ formatDate(race.raceDate) }}
      </div>
      <div v-if="race.resultCount" class="text-gray-600 flex items-center gap-1">
        <i class="pi pi-list text-sm"></i>
        {{ race.resultCount }} résultats
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFormatting } from '../composables/useFormatting'
import type { Race } from '../types'

const props = defineProps<{
  race: Race
}>()

const router = useRouter()
const { formatDate } = useFormatting()

const navigate = () => {
  router.push(`/races/${props.race.id}`)
}
</script>
