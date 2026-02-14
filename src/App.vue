<script setup lang="ts">
import { Navbar, Footer } from './components'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Navigation -->
    <Navbar />

    <!-- Main Content -->
    <main class="flex-1 py-8">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped></style>
