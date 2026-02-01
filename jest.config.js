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
  moduleNameMapper: {

    '^@/(.*)$': '<rootDir>/src/$1',
 
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};