<template>
  <footer class="bg-gray-900 text-white mt-16">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Branding -->
        <div>
          <h3 class="text-2xl font-bold f1-gradient bg-clip-text text-transparent mb-4">
            <i class="pi pi-car"></i> F1 Fantasy
          </h3>
          <p class="text-gray-400 text-sm">
            Gérez votre fantasy pool F1 et suivez vos équipes en temps réel
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-bold mb-4">Navigation</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a href="/" class="hover:text-f1-red transition-colors">Accueil</a></li>
            <li><a href="/standings" class="hover:text-f1-red transition-colors">Classement</a></li>
            <li><a href="/races" class="hover:text-f1-red transition-colors">Courses</a></li>
            <li><a href="/members" class="hover:text-f1-red transition-colors">Membres</a></li>
          </ul>
        </div>

        <!-- Info -->
        <div>
          <h4 class="font-bold mb-4">À propos</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a href="#" class="hover:text-f1-red transition-colors">À propos du projet</a></li>
            <li><a href="#" class="hover:text-f1-red transition-colors">Règles</a></li>
            <li><a href="#" class="hover:text-f1-red transition-colors">Contact</a></li>
            <li><a href="#" class="hover:text-f1-red transition-colors">Feedback</a></li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h4 class="font-bold mb-4">Suivez-nous</h4>
          <div class="flex gap-4 text-lg">
            <a href="#" class="p-2 bg-gray-800 rounded-lg hover:bg-f1-red transition-colors">
              <i class="pi pi-twitter"></i>
            </a>
            <a href="#" class="p-2 bg-gray-800 rounded-lg hover:bg-f1-red transition-colors">
              <i class="pi pi-facebook"></i>
            </a>
            <a href="#" class="p-2 bg-gray-800 rounded-lg hover:bg-f1-red transition-colors">
              <i class="pi pi-github"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-800 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-500 text-sm">
            &copy; 2026 F1 Fantasy Pool. Tous droits réservés.
          </p>
          <div class="flex gap-6 text-sm text-gray-500">
            <a href="#" class="hover:text-f1-red transition-colors">Confidentialité</a>
            <a href="#" class="hover:text-f1-red transition-colors">Conditions</a>
            <a href="#" class="hover:text-f1-red transition-colors">Cookies</a>
          </div>
        </div>
      </div>

      <!-- F1 Info -->
      <div class="text-center mt-6 pt-6 border-t border-gray-800 text-xs text-gray-600">
        <p>F1 Fantasy Pool n'est pas affilié à Formula 1, FIA ou autres organismes officiels</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Pure presentational component
</script>
