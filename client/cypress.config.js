const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    env: {
      "createUrl": "/cruds/new",
      "tableViewUrl": "/cruds",
      "gridViewUrl":"/cruds/grid-view",
      "listViewUrl":"/cruds/list-view"
    },

  },
});
