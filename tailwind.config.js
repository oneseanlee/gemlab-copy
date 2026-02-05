/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                title: ["'Zalando Sans Expanded'", "'Arial Black'", 'sans-serif'],
                body: ["'Rethink Sans'", "'Open Sans'", 'sans-serif'],
            },
            colors: {
                primary: '#242424',
                accent: '#5D8AA8',
            }
        },
    },
    plugins: [],
}
