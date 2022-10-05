var esModules = ["@giphy/js-fetch-api", "uuid"];

module.exports = {
  moduleNameMapper: {
    "@core/(.*)": "<rootDir>/src/app/core/$1",
  },
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transformIgnorePatterns: [
    // https://github.com/facebook/jest/issues/12584#issuecomment-1094034513
    `node_modules/(?!(${esModules.join("|")}|.*.mjs$))`,
  ],
};
