<template>
  <div class="container mx-auto px-6 py-8">
    <section class="flex flex-col gap-6">
      <div class="flex flex-col gap-3">
        <p class="text-sm uppercase tracking-[0.3em] text-orange-400 font-display">
          Saison 2026
        </p>
        <h1 class="text-4xl md:text-5xl font-display text-slate-100">
          Tableau de bord du pool
        </h1>
        <p class="max-w-2xl text-slate-400">
          Gardez une vue rapide sur vos equipes, le prochain Grand Prix et la forme des membres.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-[1.2fr_1fr] items-stretch">
        <Card class="f1-card h-full">
          <template #title>
            <span class="font-display text-lg">Prochain Grand Prix</span>
          </template>
          <template #content>
            <div class="flex h-full flex-col gap-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xl font-display text-slate-100">{{ nextRace.name }}</p>
                  <p class="text-sm text-slate-400">{{ nextRace.circuit }}</p>
                </div>
                <Tag :value="nextRace.status" class="font-display" />
              </div>
              <div class="grid gap-3 md:grid-cols-3">
                <div class="rounded-lg border border-slate-800/70 bg-slate-950/60 p-3">
                  <p class="text-xs text-slate-400">Date</p>
                  <p class="text-sm font-display">{{ nextRace.date }}</p>
                </div>
                <div class="rounded-lg border border-slate-800/70 bg-slate-950/60 p-3">
                  <p class="text-xs text-slate-400">Sprint</p>
                  <p class="text-sm font-display">{{ nextRace.sprint }}</p>
                </div>
                <div class="rounded-lg border border-slate-800/70 bg-slate-950/60 p-3">
                  <p class="text-xs text-slate-400">Jusqu au depart</p>
                  <p class="text-sm font-display">{{ nextRace.countdown }}</p>
                </div>
              </div>
              <div class="mt-auto flex items-center gap-3">
                <Button label="Voir la course" icon="pi pi-flag" />
                <Button
                  label="Mettre a jour l equipe"
                  icon="pi pi-users"
                  severity="secondary"
                  text
                />
              </div>
            </div>
          </template>
        </Card>

        <div class="grid gap-4 auto-rows-fr">
          <Card class="f1-card h-full">
            <template #title>
              <span class="font-display text-lg">Performance du pool</span>
            </template>
            <template #content>
              <div class="flex h-full flex-col gap-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-slate-400">Membres actifs</p>
                    <p class="text-2xl font-display">18</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-slate-400">Courses jouees</p>
                    <p class="text-2xl font-display">7/24</p>
                  </div>
                </div>
                <div class="mt-auto">
                  <div class="flex items-center justify-between text-sm text-slate-400">
                    <span>Budget moyen utilise</span>
                    <span class="font-display">68%</span>
                  </div>
                  <ProgressBar :value="68" />
                </div>
              </div>
            </template>
          </Card>

          <Card class="f1-card h-full">
            <template #title>
              <span class="font-display text-lg">Equipes tendance</span>
            </template>
            <template #content>
              <div class="flex h-full flex-wrap gap-2">
                <Chip label="McLaren Surge" icon="pi pi-bolt" />
                <Chip label="Ferrari Value" icon="pi pi-chart-line" />
                <Chip label="Red Bull Streak" icon="pi pi-star" />
              </div>
            </template>
          </Card>
        </div>
      </div>

      <Panel header="Classement provisoire" class="f1-card">
        <template #icons>
          <div class="flex items-center gap-2">
            <Dropdown
              v-model="selectedSeason"
              :options="seasonOptions"
              optionLabel="label"
              class="w-40"
            />
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="search" placeholder="Chercher un membre" />
            </span>
          </div>
        </template>
        <DataTable
          :value="standings"
          responsiveLayout="scroll"
          class="mt-4"
          :rowClass="rowClass"
        >
          <Column field="rank" header="#" style="width: 70px" />
          <Column field="member" header="Membre" />
          <Column field="team" header="Equipe" />
          <Column field="points" header="Pts" />
          <Column field="delta" header="Delta" style="width: 90px">
            <template #body="slotProps">
              <span :class="deltaClass(slotProps.data.delta)">
                {{ slotProps.data.delta }}
              </span>
            </template>
          </Column>
        </DataTable>
      </Panel>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Panel from 'primevue/panel'
import ProgressBar from 'primevue/progressbar'
import Tag from 'primevue/tag'

const seasonOptions = [
  { label: '2026', value: 2026 },
  { label: '2025', value: 2025 },
]

const selectedSeason = ref(seasonOptions[0])
const search = ref('')

const nextRace = {
  name: 'Grand Prix d Italie',
  circuit: 'Autodromo Nazionale di Monza',
  date: '06 Sep 2026',
  sprint: 'Oui',
  countdown: '4j 12h 09m',
  status: 'A venir',
}

const standings = [
  { rank: 1, member: 'Lena B.', team: 'Apex Velocity', points: 892, delta: '+12' },
  { rank: 2, member: 'Hugo M.', team: 'Orange Line', points: 874, delta: '+6' },
  { rank: 3, member: 'Maya R.', team: 'Night Chicane', points: 861, delta: '-3' },
  { rank: 4, member: 'Theo V.', team: 'Pitlane Club', points: 846, delta: '+1' },
  { rank: 5, member: 'Sara L.', team: 'Nordic Pace', points: 832, delta: '-2' },
]

const deltaClass = (delta: string) => {
  if (delta.startsWith('+')) return 'rank-up font-display'
  if (delta.startsWith('-')) return 'rank-down font-display'
  return 'rank-stable font-display'
}

const rowClass = (data: { rank: number }) =>
  data.rank === 1 ? 'p-highlight font-display' : 'font-display'
</script>
