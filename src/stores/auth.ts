import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getCurrentUser, type AuthUser } from '@/services/auth'
import { resolveMemberIdForUser } from '@/services/member'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<AuthUser | null>(null)
    const isAuthenticated = computed(() => Boolean(user.value?.authenticated))

    const fetchCurrentUser = async (): Promise<AuthUser | null> => {
        user.value = await getCurrentUser()

        if (user.value?.authenticated) {
            await resolveMemberIdForUser(user.value)
        }

        return user.value
    }

    const clearUser = () => {
        user.value = null
    }

    return {
        user,
        isAuthenticated,
        fetchCurrentUser,
        clearUser
    }
})
