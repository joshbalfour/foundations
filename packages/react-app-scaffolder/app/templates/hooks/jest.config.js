const { pathsToModuleNameMapper } = require('ts-jest')
const baseConfig = require('../../scripts/jest/jest.config')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  ...baseConfig,
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  coveragePathIgnorePatterns: ['<rootDir>/src/services', '<rootDir>/src/tests'],
  coverageThreshold: {
    global: {
      branches: 63,
      functions: 70,
      lines: 88,
      statements: 87,
    },
  },
}
