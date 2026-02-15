<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Chart from 'primevue/chart'
import 'chart.js/auto'
import { useAuthStore } from '@/stores/auth'
import GlobalRankCard from '../components/GlobalRankCard.vue'
import ParticipantTeamsCard from '../components/ParticipantTeamsCard.vue'
import GlobalStandingsCard from '../components/GlobalStandingsCard.vue'

const authStore = useAuthStore()
const authenticatedUser = computed(() => authStore.user)
const participantDisplayName = computed(() => authenticatedUser.value?.name || authenticatedUser.value?.email || 'Participant')
const participantPicture = computed(() => authenticatedUser.value?.picture)

const participantName = 'Alexandre Ouimet'
const globalRank = 4
const totalParticipants = 10
const rankDelta = '+1'
const pointsToPodium = 12
const pointsAheadNext = 8
const averagePoints = 53

const positionStats = [
    { label: 'Pts du podium', value: pointsToPodium },
    { label: 'Pts d\'avance', value: `+${pointsAheadNext}` },
    { label: 'Pts en moyenne', value: averagePoints }
]

const teams = [
    { name: 'Équipe 1', points: 512 },
    { name: 'Équipe 2', points: 476 },
    { name: 'Équipe 3', points: 431 }
]

const globalStandings = [
    { rank: 1, participant: 'Camille Gagnon', points: 1620 },
    { rank: 2, participant: 'Julien Fortin', points: 1584 },
    { rank: 3, participant: 'Sophie Tremblay', points: 1547 },
    { rank: 4, participant: 'Alexandre Ouimet', points: 1419 },
    { rank: 5, participant: 'Marc Bouchard', points: 1398 },
    { rank: 6, participant: 'Nicolas Roy', points: 1336 },
    { rank: 7, participant: 'Valérie Côté', points: 1295 },
    { rank: 8, participant: 'Étienne Lavoie', points: 1248 },
    { rank: 9, participant: 'Mélanie Gendron', points: 1203 },
    { rank: 10, participant: 'Patrick Morin', points: 1167 }
]

const grandPrixLabels = [
    'Bahreïn',
    'Arabie saoudite',
    'Australie',
    'Japon',
    'Chine',
    'Miami',
    'Émilie-Romagne',
    'Monaco'
]
const pointsEvolution = [
    { participant: 'Camille Gagnon', points: [188, 392, 587, 801, 1008, 1217, 1419, 1620] },
    { participant: 'Julien Fortin', points: [176, 378, 562, 776, 985, 1188, 1387, 1584] },
    { participant: 'Sophie Tremblay', points: [168, 360, 549, 748, 956, 1146, 1352, 1547] },
    { participant: 'Alexandre Ouimet', points: [142, 326, 498, 681, 856, 1044, 1228, 1419] },
    { participant: 'Marc Bouchard', points: [138, 312, 486, 669, 844, 1032, 1217, 1398] },
    { participant: 'Nicolas Roy', points: [132, 299, 462, 637, 803, 992, 1161, 1336] },
    { participant: 'Valérie Côté', points: [126, 286, 448, 618, 779, 963, 1124, 1295] },
    { participant: 'Étienne Lavoie', points: [120, 274, 431, 592, 751, 931, 1087, 1248] },
    { participant: 'Mélanie Gendron', points: [114, 262, 414, 569, 724, 899, 1054, 1203] },
    { participant: 'Patrick Morin', points: [108, 251, 398, 551, 702, 873, 1022, 1167] }
]

const css = getComputedStyle(document.documentElement)
const primaryColor = css.getPropertyValue('--p-primary-color').trim() || '#8b5cf6'
const secondaryLineColor = css.getPropertyValue('--p-surface-500').trim() || '#71717a'
const axisColor = css.getPropertyValue('--p-surface-700').trim() || '#a1a1aa'
const gridColor = css.getPropertyValue('--p-surface-300').trim() || '#3f3f46'

const pointsChartData = {
    labels: grandPrixLabels,
    datasets: pointsEvolution.map((entry) => {
        const isCurrentParticipant = entry.participant === participantName

        return {
            label: entry.participant,
            data: entry.points,
            borderColor: isCurrentParticipant ? primaryColor : secondaryLineColor,
            backgroundColor: isCurrentParticipant ? primaryColor : secondaryLineColor,
            borderWidth: isCurrentParticipant ? 3 : 1.25,
            pointRadius: isCurrentParticipant ? 3 : 1.5,
            pointHoverRadius: isCurrentParticipant ? 4 : 2,
            tension: 0.35,
            fill: false
        }
    })
}

const pointsChartOptions = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            ticks: {
                color: axisColor,
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                padding: 8
            },
            grid: {
                color: gridColor
            }
        },
        y: {
            ticks: {
                color: axisColor
            },
            grid: {
                color: gridColor
            }
        }
    }
}
</script>

<template>
    <main>
        <h1>Accueil</h1>

        <Splitter style="height: auto">
            <SplitterPanel :size="33" :minSize="25" style="display: flex">
                <GlobalRankCard :global-rank="globalRank" :total-participants="totalParticipants"
                    :rank-delta="rankDelta" :position-stats="positionStats" />
            </SplitterPanel>

            <SplitterPanel :size="67" :minSize="45" style="display: flex">
                <ParticipantTeamsCard :participant-name="participantDisplayName"
                    :participant-picture="participantPicture" :teams="teams" />
            </SplitterPanel>
        </Splitter>

        <Divider />

        <Splitter style="height: auto">
            <SplitterPanel :size="33" :minSize="25" style="display: flex">
                <GlobalStandingsCard :standings="globalStandings" />
            </SplitterPanel>

            <SplitterPanel :size="67" :minSize="45" style="display: flex">
                <Card class="points-evolution-card" style="width: 100%; height: 100%">
                    <template #title>Évolution des points</template>
                    <template #content>
                        <Chart type="line" :data="pointsChartData" :options="pointsChartOptions" style="height: 100%" />
                    </template>
                </Card>
            </SplitterPanel>
        </Splitter>
    </main>
</template>

<style scoped>
:deep(.points-evolution-card .p-card-body) {
    height: 100%;
    display: flex;
    flex-direction: column;
}

:deep(.points-evolution-card .p-card-content) {
    flex: 1;
    min-height: 0;
}

:deep(.points-evolution-card .p-chart) {
    height: 100%;
}
</style>
