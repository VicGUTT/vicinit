export default {
    '*.{js,ts,vue}': ['eslint . --ext .js,.ts,.vue --max-warnings=0', 'prettier -l'],
    '*.json': 'eslint . --ext .js,.ts,.vue --max-warnings=0',
    '*.{json,html,yml,md,css,php,vue}': 'prettier . -l',
};
