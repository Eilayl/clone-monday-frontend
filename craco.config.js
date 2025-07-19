const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  jest: {
    configure: {
      // חשוב ש-Jest ידע לטפל בקבצי ts/tsx
      transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
      },
      moduleNameMapper: {
        // כדי שפתרון אליאסים יעבוד גם בבדיקות
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      testEnvironment: "jsdom",
    },
  },
};
