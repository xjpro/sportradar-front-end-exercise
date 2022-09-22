const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
