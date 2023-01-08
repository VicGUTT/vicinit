/* eslint-disable @typescript-eslint/no-var-requires */

const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        // './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        // './storage/framework/views/*.php',
        './app/View/**/*.php',
        './resources/**/*.{blade.php,js,ts,vue,css}',
    ],
    theme: {
        // fontFace: [
        //     'https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
        // ],
        screens: {
            xs: '320px',
            sm: defaultTheme.screens.sm, // '640px'
            md: defaultTheme.screens.md, // '768px'
            lg: defaultTheme.screens.lg, // '1024px'
            xl: defaultTheme.screens.xl, // '1280px'
            '2xl': defaultTheme.screens['2xl'], // '1536px'
            // '3xl': '1920px'
        },
        extend: {
            colors: {
                // Brand colors
                primary: colors.pink,
                secondary: colors.amber,
                tertiary: colors.sky,
                app: colors.gray,

                // Contextual colors
                info: colors.blue,
                success: colors.green,
                warning: colors.orange,
                error: colors.red,
            },
            fontFamily: {
                sans: ['"Mulish"', ...defaultTheme.fontFamily.sans],
            },
            // fontSize: {
            //     '2xs': ['0.6875rem', '0.875rem'], // 11px & 14px
            //     '3xs': ['0.625rem', '0.75rem'], // 10px & 12px
            // },
            // height: {
            //     4.5: '1.125rem', // 18px
            //     5.5: '1.375rem', // 22px
            //     18: '4.5rem', // 72px
            // },
            // width: {
            //     4.5: '1.125rem', // 18px
            //     5.5: '1.375rem', // 22px
            //     18: '4.5rem', // 72px
            // },
            maxWidth: {
                // '8xl': '90rem',
                container: '85rem', // 1360px
                // 'prose-lg': '70ch',
                'prose-xl': '75ch',
            },
            // padding: {
            //     18: '4.5rem',
            //     22: '5.5rem',
            // },
            zIndex: {
                1: 1,
            },
        },
    },
    corePlugins: {
        container: false,
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/container-queries'),
        require('@tailwindcss/line-clamp'),
        require('@vicgutt/tailwindcss-debug'),
        // require('@vicgutt/tailwindcss-feature-detection')(
        //     require('@vicgutt/tailwindcss-feature-detection/dist/defaults')
        // ),
        // require('@vicgutt/tailwindcss-font-face')({
        //     fontDir: './public/fonts/Mulish',
        //     fontPath: '/fonts/Mulish',
        // }),
        plugin(function ({ addComponents }) {
            addComponents({
                '.container': {
                    '@apply max-w-container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0': {},
                },
            });
        }),
    ],
};

/* eslint-enable @typescript-eslint/no-var-requires */
