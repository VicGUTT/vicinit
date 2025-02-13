/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
    '*.{js,ts,vue}': ['eslint --max-warnings=0', 'prettier -l'],
    '*.json': 'eslint --max-warnings=0',
    '*.{json,html,yml,md,css,php,vue}': 'prettier . -l',
};
