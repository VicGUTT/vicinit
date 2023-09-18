import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import preset from '@vicgutt/tailwindcss-opinionated-preset';

export default {
    presets: [
        preset({
            plugins: {
                colors: {
                    primary: colors.pink,
                    secondary: colors.amber,
                    tertiary: colors.sky,
                },
            },
        }),
    ],
} satisfies Config;
