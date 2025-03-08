export default {
  testPathIgnorePatterns: ["/node_modules/", "/tests/browser/"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jest-environment-jsdom",
};
