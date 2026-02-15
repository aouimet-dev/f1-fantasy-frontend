<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <RouterView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');

html,
body {
  font-family: 'Orbitron', sans-serif;
}

html,
body,
#app {
  min-height: 100%;
  margin: 0;
}

.app-shell {
  min-height: 100%;
  width: min(1100px, 100%);
  margin: 0 auto;
}
</style>
