<script setup lang="ts">
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'
import Divider from 'primevue/divider'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import GlobalRankCard from '../components/GlobalRankCard.vue'
import ParticipantTeamsCard from '../components/ParticipantTeamsCard.vue'
import GlobalStandingsCard from '../components/GlobalStandingsCard.vue'

const participantName = 'Alexandre Ouimet'
const globalRank = 4
const totalParticipants = 10
const rankDelta = '+1'
const pointsToPodium = 12
const pointsAheadNext = 8
const averagePoints = 53

const positionStats = [
    { label: 'Pts du podium', value: pointsToPodium },
    { label: 'Pts d’avance', value: `+${pointsAheadNext}` },
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
                <ParticipantTeamsCard :participant-name="participantName" :teams="teams" />
            </SplitterPanel>
        </Splitter>

        <Divider />

        <Splitter style="height: auto">
            <SplitterPanel :size="33" :minSize="25" style="display: flex">
                <GlobalStandingsCard :standings="globalStandings" />
            </SplitterPanel>

            <SplitterPanel :size="67" :minSize="45" style="display: flex">
                <Card style="width: 100%; height: 100%">
                    <template #title>Évolution des points</template>
                    <template #content>
                        <Skeleton width="100%" height="12rem" />
                    </template>
                </Card>
            </SplitterPanel>
        </Splitter>

        <Divider />

        <Card>
            <template #title>Section</template>
            <template #content>
                <Skeleton width="100%" height="2rem" />
                <Divider />
                <Skeleton width="100%" height="2rem" />
            </template>
        </Card>
    </main>
</template>
