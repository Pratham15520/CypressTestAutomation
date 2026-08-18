import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  expose: {
    testAutomationPractice: "https://testautomationpractice.blogspot.com/",
  
  },
  env: {
    webDriverUniversity: "https://www.webdriveruniversity.com/",
    bondarAcademyUrl: "https://www.playground.bondaracademy.com/pages/iot-dashboard",
    demoQAUrl: "https://demoqa.com/",
    herokuAppUrl: "https://the-internet.herokuapp.com/",
    sauceDemoUrl: "https://www.saucedemo.com/",
  },

  e2e: {
    // baseUrl: "https://www.webdriveruniversity.com/",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      return config;
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx,feature}",
    execTimeout: 8000,
  },

  viewportWidth: 1920,
  viewportHeight: 1080,
});
