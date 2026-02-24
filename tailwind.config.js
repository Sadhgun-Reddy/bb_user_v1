/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#ee6c2b",
                "primary-light": "#fff1e8",
                "primary-dark": "#c45012",
                "neutral-50": "#fcf9f8",
                "neutral-100": "#f3ebe7",
                "neutral-200": "#e7d7cf",
                "neutral-800": "#1b120d",
                "neutral-900": "#120a07",
                "background-light": "#fcf9f8",
                "background-dark": "#1b120d",
                "success": "#10b981",
                "error": "#ef4444",
                "surface": "#ffffff",
                "textMain": "#1b120d",
                "textMuted": "#4b5563"
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"],
                "sans": ["Plus Jakarta Sans", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "1rem",
            }
        },
    },
    plugins: [],
}
