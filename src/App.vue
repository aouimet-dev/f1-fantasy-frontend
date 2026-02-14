<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Navigation Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <router-link to="/" class="text-2xl font-bold f1-gradient bg-clip-text text-transparent">
            F1 Fantasy
          </router-link>
          <div class="flex gap-6">
            <router-link
              to="/"
              active-class="text-f1-red font-semibold"
              class="text-gray-700 hover:text-f1-red transition"
            >
              Dashboard
            </router-link>
            <router-link
              to="/standings"
              active-class="text-f1-red font-semibold"
              class="text-gray-700 hover:text-f1-red transition"
            >
              Classement
            </router-link>
            <router-link
              to="/races"
              active-class="text-f1-red font-semibold"
              class="text-gray-700 hover:text-f1-red transition"
            >
              Courses
            </router-link>
            <router-link
              to="/members"
              active-class="text-f1-red font-semibold"
              class="text-gray-700 hover:text-f1-red transition"
            >
              Membres
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-8 mt-16">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2026 F1 Fantasy Pool. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
