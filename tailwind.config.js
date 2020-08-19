module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
    },
    purge: ['src/**/*.tsx'],
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [require('@tailwindcss/typography')],
};
