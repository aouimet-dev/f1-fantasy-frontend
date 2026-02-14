<template>
  <div v-if="show" class="bg-red-50 border-l-4 border-f1-red p-4 mb-4 rounded">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <i class="pi pi-exclamation-circle text-f1-red text-xl"></i>
      </div>
      <div class="ml-4 flex-1">
        <h3 class="text-sm font-medium text-red-900">{{ title }}</h3>
        <p class="text-sm text-red-700 mt-1">{{ message }}</p>
        <button 
          v-if="dismissible" 
          @click="show = false"
          class="mt-2 text-sm text-red-700 hover:text-red-900 font-medium"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  title: string
  message: string
  dismissible?: boolean
}>(), {
  dismissible: true
})

const show = ref(true)
</script>
