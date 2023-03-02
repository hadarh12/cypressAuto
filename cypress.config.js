const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qaplayground.dev/apps/tags-input-box/",
    setupNodeEvents(on, config) {
    },
  },
});
