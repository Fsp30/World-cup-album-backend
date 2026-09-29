import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset({
  useESM: true,
  tsconfig: 'tsconfig.json',
}).transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"], 
  transform: {
    ...tsJestTransformCfg,
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/index.ts',
    '!src/__tests__/**',
  ],
  moduleNameMapper: {

    '^@/(.*)$': '<rootDir>/src/$1',
 
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: [
    "**/__tests__/**/*.test.ts",
    "**/__tests__/**/*.spec.ts"
  ],
};