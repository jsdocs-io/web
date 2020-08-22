module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
    },
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
        textColor: ['dark', 'dark-hover', 'hover'],
    },
    plugins: [
        require('tailwindcss-dark-mode')(),
        require('@tailwindcss/typography'),
    ],
};
