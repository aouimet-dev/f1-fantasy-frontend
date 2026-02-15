<template>
  <div :class="[
    'f1-badge',
    teamColorClass
  ]">
    <span class="truncate">{{ teamName }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  teamName: string
}>()

const teamColorClass = computed(() => {
  const name = props.teamName.toLowerCase()
  if (name.includes('red') || name.includes('ferrari')) return 'bg-f1-red/20 text-f1-red'
  if (name.includes('silver') || name.includes('mercedes')) return 'bg-f1-silver/30 text-gray-800'
  if (name.includes('orange') || name.includes('mclaren')) return 'bg-f1-orange/20 text-f1-orange'
  if (name.includes('blue') || name.includes('red bull')) return 'bg-f1-blue/20 text-f1-blue'
  if (name.includes('green') || name.includes('aston')) return 'bg-f1-green/20 text-f1-green'
  return 'bg-gray-200 text-gray-800'
})
</script>
