<template>
  <div class="flex items-center gap-2">
    <span class="text-lg font-bold">{{ rank }}</span>
    <div v-if="rankChange !== 0" class="flex items-center gap-1">
      <i v-if="rankChange > 0" class="pi pi-arrow-up-right text-green-600 text-sm"></i>
      <i v-else class="pi pi-arrow-down-right text-red-600 text-sm"></i>
      <span :class="rankChange > 0 ? 'text-green-600 rank-up' : 'text-red-600 rank-down'" class="text-sm font-semibold">
        {{ Math.abs(rankChange) }}
      </span>
    </div>
    <span v-else class="text-sm text-gray-500">—</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  rank: {
    type: Number,
    required: true
  },
  rankChange: {
    type: Number,
    default: 0
  }
})
</script>
