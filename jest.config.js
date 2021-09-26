/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
export default {
    preset: 'ts-jest',
    bail: true,
    maxWorkers: '50%',
    errorOnDeprecated: true,
    roots: ['<rootDir>/src/', '<rootDir>/tests/'],
    testEnvironment: 'node',
    coverageDirectory: '.coverage',
    collectCoverageFrom: ['src/**/*.{ts,js}'],
    coverageThreshold: {
        global: {
            statements: 90,
            branches: 90,
            functions: 90,
            lines: 90,
        },
    },
};
