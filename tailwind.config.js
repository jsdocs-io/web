const colors = require('tailwindcss/colors');

module.exports = {
    darkMode: 'class',
    content: ['src/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                gray: colors.stone,
                blue: colors.sky,
            },
        },
    },
};
