<script setup lang="ts">
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'
import Divider from 'primevue/divider'
</script>

<template>
    <main>
        <h1>Home</h1>

        <Card>
            <template #title>Section</template>
            <template #content>
                <Skeleton width="12rem" height="1rem" />
                <Divider />
                <Skeleton width="18rem" height="1rem" />
                <Divider />
                <Skeleton width="10rem" height="1rem" />
            </template>
        </Card>

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
