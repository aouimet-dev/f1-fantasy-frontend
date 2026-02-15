<script setup lang="ts">
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'
import Divider from 'primevue/divider'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'

const participantName = 'Alex Ouimet'
const globalRank = 4
const totalParticipants = 28

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
                <Card style="width: 100%; height: 100%">
                    <template #title>Position globale</template>
                    <template #content>
                        <p style="font-size: 2rem; margin: 0"><strong>#{{ globalRank }}</strong></p>
                        <p style="margin-top: 0.5rem">sur {{ totalParticipants }} participants</p>
                    </template>
                </Card>
            </SplitterPanel>

            <SplitterPanel :size="67" :minSize="45" style="display: flex">
                <Card style="width: 100%; height: 100%">
                    <template #title>Aperçu du participant</template>
                    <template #content>
                        <p><strong>Participant:</strong> {{ participantName }}</p>
                        <Divider />
                        <p><strong>Équipes:</strong></p>
                        <ul>
                            <li v-for="team in teams" :key="team.name">{{ team.name }} — {{ team.points }} pts</li>
                        </ul>
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
