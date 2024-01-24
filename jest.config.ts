/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('ts-jest').JestConfigWithTsJest} */

import type { Config } from 'jest';

const config: Config = {
    bail: 1,
    coverageProvider: 'v8',
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss)$': 'babel-jest',
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    verbose: true,
};

export default config;
