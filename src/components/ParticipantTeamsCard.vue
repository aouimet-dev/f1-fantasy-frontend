<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
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

const emit = defineEmits<{
    'create-teams': [teamNames: string[]]
}>()

const teamsTotalPoints = computed(() => props.teams.reduce((sum, team) => sum + team.points, 0))
const newTeamNames = ref(['', '', ''])
const canSubmitTeams = computed(() => newTeamNames.value.every((teamName) => teamName.trim().length > 0))

const submitTeams = () => {
    if (!canSubmitTeams.value) {
        return
    }

    emit('create-teams', newTeamNames.value.map((teamName) => teamName.trim()))
}
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
            <div v-if="teams.length === 0" style="display: grid; padding: 1rem; gap: 0.75rem">
                <span>Entre tes 3 équipes</span>
                <InputText v-model="newTeamNames[0]" placeholder="Équipe 1" />
                <InputText v-model="newTeamNames[1]" placeholder="Équipe 2" />
                <InputText v-model="newTeamNames[2]" placeholder="Équipe 3" />
                <Button label="Créer mes équipes" :disabled="!canSubmitTeams" @click="submitTeams" />
            </div>

            <DataTable v-else :value="teams" size="small" :showGridlines="true" :showHeaders="false">
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
