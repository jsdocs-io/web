module.exports = {
    future: 'all',
    purge: {
        content: ['src/**/*.tsx'],
        options: { whitelist: ['mode-dark'] },
    },
    theme: {
        extend: {},
    },
    variants: {
        backgroundColor: ['dark', 'dark-hover', 'hover'],
        borderColor: ['dark'],
        textColor: ['dark', 'dark-hover', 'hover', 'active'],
    },
    plugins: [require('tailwindcss-dark-mode')()],
};
