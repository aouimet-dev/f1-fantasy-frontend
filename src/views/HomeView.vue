<script setup lang="ts">
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'
import Divider from 'primevue/divider'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import GlobalRankCard from '../components/GlobalRankCard.vue'
import ParticipantTeamsCard from '../components/ParticipantTeamsCard.vue'

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

        <Card>
            <template #title>Section</template>
            <template #content>
                <Skeleton width="100%" height="2rem" />
                <Divider />
                <Skeleton width="100%" height="2rem" />
                <Divider />
                <Skeleton width="100%" height="2rem" />
            </template>
        </Card>

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
