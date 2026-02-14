/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'f1-red': '#DC0000',      // Ferrari Red
                'f1-yellow': '#FFD700',   // Race Yellow
                'f1-silver': '#C0C0C0',   // Mercedes Silver
                'f1-orange': '#FF8700',   // McLaren Orange
                'f1-blue': '#0082FA',     // Alpine/Red Bull Blue
                'f1-green': '#00D26A',    // Aston Martin Green
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['Courier New', 'monospace'],
            },
        },
    },
    plugins: [],
}
