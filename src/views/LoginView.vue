<script setup lang="ts">
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import LoginWithGoogleButton from '@/components/LoginWithGoogleButton.vue'

const router = useRouter()

const loginWithGoogle = async () => {
    await router.push({ name: 'home' })
}
</script>

<template>
    <main class="login-page">
        <Card class="login-card">
            <template #title>F1 Fantasy</template>
            <template #subtitle>Sign in to access the home page</template>
            <template #content>
                <LoginWithGoogleButton class="google-btn" @click="loginWithGoogle" />
            </template>
        </Card>
    </main>
</template>

<style scoped>
.login-page {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 1rem;
}

.login-card {
    width: min(28rem, 100%);
}

.google-btn {
    width: 100%;
}
</style>
