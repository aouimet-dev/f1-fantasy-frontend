<script setup lang="ts">
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import Tag from 'primevue/tag'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

type PositionStat = {
    label: string
    value: string | number
}

defineProps<{
    globalRank: number | null
    totalParticipants: number
    rankDelta: string
    positionStats: PositionStat[]
    hasData: boolean
}>()
</script>

<template>
    <Card style="width: 100%; height: 100%">
        <template #title>
            <div style="height: 4.25rem; display: flex; flex-direction: column">
                <p v-if="hasData" style="font-size: 2.8rem; margin: 0; line-height: 1.1">
                    <strong>
                        {{ globalRank }}
                        <span style="font-size: 1.4rem">e</span>
                    </strong>
                    <span style="font-size: 0.95rem; opacity: 0.75; margin-left: 0.35rem">/ {{ totalParticipants
                    }}</span>
                    <Tag :value="rankDelta" severity="success" style="margin-left: 0.5rem" />
                </p>
                <p v-else style="font-size: 2rem; margin: 0; line-height: 1.1; opacity: 0.55">
                    —
                </p>
                <p style="margin: 0.4rem 0 0 0; opacity: 0.75; font-size: 0.85rem; font-weight: 400">Classement général
                </p>
            </div>
        </template>
        <template #content>
            <Divider />
            <p v-if="!hasData"
                style="margin: 0; opacity: 0.75; min-height: 2.25rem; display: flex; align-items: center">
                Aucune donnée pour le moment.
            </p>
            <DataTable v-else :value="positionStats" size="small" :showGridlines="true" :showHeaders="false">
                <Column field="label" />
                <Column field="value" bodyStyle="text-align: center" />
            </DataTable>
        </template>
    </Card>
</template>
