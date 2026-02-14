<template>
  <div class="flex items-center justify-center py-20">
    <div class="space-y-3 text-center">
      <div class="flex justify-center">
        <div class="animate-spin">
          <i class="pi pi-spinner text-f1-red text-4xl"></i>
        </div>
      </div>
      <p class="text-gray-500 text-sm">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: 'Chargement...'
  }
})
</script>
