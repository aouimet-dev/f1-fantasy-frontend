<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

type Team = {
    name: string
    points: number
}

const props = defineProps<{
    participantName: string
    participantPicture?: string | null
    teams: Team[]
}>()

const teamsTotalPoints = computed(() => props.teams.reduce((sum, team) => sum + team.points, 0))
</script>

<template>
    <Card style="width: 100%; height: 100%">
        <template #title>
            <div
                style="height: 4.25rem; display: flex; justify-content: space-between; align-items: baseline; gap: 0.75rem">
                <span style="display: inline-flex; align-items: center; gap: 0.5rem">
                    <img v-if="participantPicture" :src="participantPicture" alt="Participant avatar"
                        style="width: 1.8rem; height: 1.8rem; border-radius: 9999px" />
                    <span>{{ participantName }}</span>
                </span>
                <span style="display: inline-flex; align-items: baseline; gap: 0.2rem">
                    <span style="opacity: 0.9; margin-right: 0.2rem; font-size: 0.85rem">Total</span>
                    <strong style="font-size: 2.8rem; line-height: 1; color: var(--p-primary-color)">{{ teamsTotalPoints
                    }}</strong>
                    <span style="font-size: 0.8rem; margin-left: 0.2rem; opacity: 0.85">pts</span>
                </span>
            </div>
        </template>
        <template #content>
            <Divider />
            <DataTable :value="teams" size="small" :showGridlines="true" :showHeaders="false">
                <Column field="name" />
                <Column field="points" bodyStyle="text-align: center">
                    <template #body="{ data }">
                        <strong style="color: var(--p-primary-color)">{{ data.points }} pts</strong>
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
</template>
