module.exports = {
    content: [
        './app//*.{js,ts,jsx,tsx}',
        './pages//.{js,ts,jsx,tsx}',
        './components/**/.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                // use CSS variables so design tokens stay centralized
                primary: "var(--color-primary)",
                "primary-600": "var(--color-primary-600)",
                accent: "var(--color-accent)",
                bgstart: "var(--color-bg-start)",
                bgend: "var(--color-bg-end)",
                muted: "var(--color-muted)",
                "muted-2": "var(--color-muted-2)",
                success: "var(--color-success)",
                danger: "var(--color-danger)",
                surface: "var(--color-surface)",
                border: "var(--color-border)",
            },
            // (other extends...)
        },
    },
    plugins: [],
};