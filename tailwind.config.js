/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,ts}'
    ],
    theme: {
        extend: {
            colors: {
                primary: '#c49a6c', // màu BĐS giống noxhtrungthai
                dark: '#1f2937'
            }
        },
    },
    plugins: [],
}
