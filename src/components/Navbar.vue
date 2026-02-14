<template>
  <nav class="bg-white shadow-md border-b-4 border-f1-red">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 text-2xl font-bold f1-gradient bg-clip-text text-transparent hover:opacity-80">
          <i class="pi pi-car"></i>
          F1 Fantasy
        </router-link>

        <!-- Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <router-link 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            class="text-gray-700 hover:text-f1-red transition-colors font-medium"
            :class="{ 'text-f1-red border-b-2 border-f1-red': isActive(link.path) }"
          >
            {{ link.label }}
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <button @click="toggleMobileMenu" class="md:hidden p-2 hover:bg-gray-100 rounded-lg">
          <i :class="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-2xl"></i>
        </button>

        <!-- User menu (placeholder) -->
        <div class="hidden md:flex items-center gap-4">
          <button class="p-2 hover:bg-gray-100 rounded-lg">
            <i class="pi pi-bell text-xl text-gray-600"></i>
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-lg">
            <i class="pi pi-user text-xl text-gray-600"></i>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t py-4 space-y-2">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path"
          @click="mobileMenuOpen = false"
          class="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-f1-red transition-colors"
        >
          {{ link.label }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Classement', path: '/standings' },
  { label: 'Courses', path: '/races' },
  { label: 'Membres', path: '/members' }
]

const isActive = (path: string) => {
  return route.path === path
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>
