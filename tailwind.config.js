const colors = require('tailwindcss/colors');

module.exports = {
    darkMode: 'class',
    purge: {
        content: ['src/**/*.tsx'],
    },
    theme: {
        extend: {
            colors: {
                gray: colors.warmGray,
                blue: colors.sky,
            },
        },
    },
    variants: {
        extend: {
            textColor: ['active'],
        },
    },
};
