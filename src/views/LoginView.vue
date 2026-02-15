<script setup lang="ts">
import Card from 'primevue/card'
import LoginWithGoogleButton from '@/components/LoginWithGoogleButton.vue'
import { startGoogleLogin } from '@/services/auth'

const loginWithGoogle = () => {
    startGoogleLogin()
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
