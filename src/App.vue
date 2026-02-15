<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

type TeamRow = {
  member: string
  team: string
  points: number
}

const rows = ref<TeamRow[]>([
  { member: 'Alex', team: 'Pole Hunters', points: 482 },
  { member: 'Sophie', team: 'Apex Predators', points: 459 },
  { member: 'Liam', team: 'Purple Pace', points: 441 }
])
</script>

<template>
  <main>
    <Card>
      <template #title>F1 Fantasy - Dark Theme Preview</template>
      <template #subtitle>Base setup: Button, Card, DataTable</template>
      <template #content>
        <div>
          <Button label="Créer une équipe" icon="pi pi-plus" />
        </div>
      </template>
    </Card>

    <div style="margin-top: 2rem;">
      <DataTable :value="rows">
        <Column field="member" header="Membre" />
        <Column field="team" header="Équipe" />
        <Column field="points" header="Points" />
      </DataTable>
    </div>
    
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');

body {
  font-family: 'Orbitron', sans-serif;
}
</style>
