<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="app-shell flex flex-col">
    <!-- Navigation Header -->
    <header class="relative border-b border-slate-900/80 bg-neutral-900/90 shadow-lg shadow-black/50">
      <div class="absolute inset-x-0 top-0 h-1 f1-gradient" />
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <router-link
            to="/"
            class="text-2xl font-bold f1-gradient bg-clip-text text-transparent font-display"
          >
            F1 Fantasy
          </router-link>
          <div class="flex gap-6">
            <router-link
              to="/"
              active-class="text-orange-400 font-semibold"
              class="text-slate-300 hover:text-orange-300 transition font-display"
            >
              Dashboard
            </router-link>
            <router-link
              to="/standings"
              active-class="text-orange-400 font-semibold"
              class="text-slate-300 hover:text-orange-300 transition font-display"
            >
              Classement
            </router-link>
            <router-link
              to="/races"
              active-class="text-orange-400 font-semibold"
              class="text-slate-300 hover:text-orange-300 transition font-display"
            >
              Courses
            </router-link>
            <router-link
              to="/members"
              active-class="text-orange-400 font-semibold"
              class="text-slate-300 hover:text-orange-300 transition font-display"
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

  </div>
</template>

<style scoped></style>
