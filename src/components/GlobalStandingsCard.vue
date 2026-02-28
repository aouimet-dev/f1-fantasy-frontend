<script setup lang="ts">
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

type StandingRow = {
    rank: number
    participant: string
    points: number
}

defineProps<{
    standings: StandingRow[]
}>()
</script>

<template>
    <Card style="width: 100%; height: 100%">
        <template #title>Classement global</template>
        <template #content>
            <Divider />
            <p v-if="standings.length === 0" style="margin: 0; opacity: 0.75">
                Aucun classement disponible pour le moment.
            </p>
            <DataTable v-else :value="standings" size="small" :showGridlines="true">
                <Column field="rank" header="#" bodyStyle="text-align: center; width: 3rem" />
                <Column field="participant" header="Participant" />
                <Column field="points" header="Points" bodyStyle="text-align: center">
                    <template #body="{ data }">
                        <strong style="color: var(--p-primary-color)">{{ data.points }}</strong>
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
</template>
