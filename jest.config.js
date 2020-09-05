module.exports = {
    collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testMatch: ['<rootDir>/**/*.test.{ts,tsx,js,jsx}'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
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