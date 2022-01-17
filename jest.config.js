module.exports = {
    testEnvironment: 'node',
    collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/data/**'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testMatch: ['<rootDir>/**/*.test.{ts,tsx,js,jsx}'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    },
    transformIgnorePatterns: [
        '/node_modules/',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
};
