import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'
import { pinia } from './stores'

const app = createApp(App)

app.use(pinia)
app.use(router)

const F1DarkTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{violet.50}',
            100: '{violet.100}',
            200: '{violet.200}',
            300: '{violet.300}',
            400: '{violet.400}',
            500: '{violet.500}',
            600: '{violet.600}',
            700: '{violet.700}',
            800: '{violet.800}',
            900: '{violet.900}',
            950: '{violet.950}'
        },
        colorScheme: {
            dark: {
                primary: {
                    color: '{violet.700}',
                    contrastColor: '{surface.950}',
                    hoverColor: '{violet.400}',
                    activeColor: '{violet.300}'
                },
                surface: {
                    0: '{zinc.950}',
                    50: '{zinc.900}',
                    100: '{zinc.800}',
                    200: '{zinc.700}',
                    300: '{zinc.600}',
                    400: '{zinc.500}',
                    500: '{zinc.400}',
                    600: '{zinc.300}',
                    700: '{zinc.200}',
                    800: '{zinc.100}',
                    900: '{zinc.50}',
                    950: '{zinc.50}'
                }
            }
        }
    },
    components: {
        button: {
            root: {
                primary: {
                    background: '{violet.500}',
                    hoverBackground: '{violet.400}',
                    activeBackground: '{violet.300}',
                    borderColor: '{violet.500}',
                    hoverBorderColor: '{violet.400}',
                    activeBorderColor: '{violet.300}',
                    color: '{surface.950}'
                }
            }
        },
        card: {
            root: {
                background: '{surface.100}',
                color: '{surface.800}'
            },
            body: {
                gap: '0.4rem'
            },
            subtitle: {
                color: '{surface.600}'
            }
        },
        datatable: {
            header: {
                background: '{surface.100}',
                borderColor: '{surface.300}',
                color: '{surface.600}'
            },
            headerCell: {
                background: '{surface.100}',
                color: '{surface.600}'
            },
            row: {
                background: '{surface.50}',
                color: '{surface.900}',
                hoverBackground: '{surface.100}'
            },
            bodyCell: {
                borderColor: '{surface.400}'
            }
        },
        splitter: {
            root: {
                background: '{surface.50}',
                borderColor: '{surface.50}'
            },
            gutter: {
                background: '{surface.50}'
            }
        }
        
    }
})

app.use(PrimeVue, {
    theme: {
        preset: F1DarkTheme,
        options: {
            prefix: 'p',
            darkModeSelector: '.app-dark',
            cssLayer: false
    }
    }
})

document.documentElement.classList.add('app-dark')

app.mount('#app')
