/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['./'],
  setupFilesAfterEnv: ["./tests/setup.js", "./tests/setupMocks.ts"]
};
