<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import Menubar from 'primevue/menubar'

const route = useRoute()
const navbarItems = [
  { label: 'Accueil', route: '/home' },
  { label: 'Membres', route: '/members' },
]

const showNavbar = computed(() => route.name !== 'login')
</script>

<template>
  <div class="app-root">
    <Menubar v-if="showNavbar" :model="navbarItems" class="app-navbar">
      <template #item="{ item, props }">
        <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
      </template>
    </Menubar>

    <div class="app-shell">
      <RouterView />
    </div>
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
  background-color: var(--p-surface-50);
}

.app-shell {
  min-height: 100%;
  width: min(1100px, 100%);
  margin: 0 auto;
}
</style>
