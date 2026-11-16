
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  timeout: 50000,

  expect: {
    timeout: 8000
  },

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: 'https://demo.playwright.dev/todomvc/',
    headless: false, // Runs only Chromium in headed mode
    launchOptions: {
      // Slows down Playwright operations by 500 milliseconds
      slowMo: 2000,
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
        
      }
    }
  ]

});
