/* eslint-disable @typescript-eslint/no-var-requires */

const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [
        require('@vicgutt/tailwindcss-opinionated-preset')({
            plugins: {
                colors: {
                    primary: colors.pink,
                    secondary: colors.amber,
                    tertiary: colors.sky,
                },
            },
        }),
    ],
};

/* eslint-enable @typescript-eslint/no-var-requires */
