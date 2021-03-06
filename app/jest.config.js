module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/setuptests.js"],
  coverageReporters: ["html"],
  collectCoverageFrom: ["src/**/*.js"],
};
