import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export const useUiStore = defineStore('ui', () => {
  const darkMode = ref(false)
  const sidebarOpen = ref(true)
  const toasts = ref<Toast[]>([])

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration = 3000) => {
    const id = Date.now().toString()
    const toast: Toast = { id, message, type, duration }
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const clearToasts = () => {
    toasts.value = []
  }

  return {
    darkMode,
    sidebarOpen,
    toasts,
    toggleDarkMode,
    toggleSidebar,
    showToast,
    removeToast,
    clearToasts
  }
})
