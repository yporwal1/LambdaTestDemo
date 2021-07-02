const path = require('path')
const fs = require('fs')

global.downloadDir = path.join(__dirname, '../tempDownload');

exports.config = {

  services: [
    [
      "lambdatest",
      {
        tunnel: false,
        lambdatestOpts: {
          logFile: "tunnel.log"
        }
      }
    ]
  ],
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,
  specs: ['./tests/specs/**/*.js'],
  exclude: [],

  capabilities: [
    {
      browserName: "chrome",
      browserVersion: "91.0",
      platformName:"Windows 10",
      unhandledPromptBehavior:"ignore",
      build: "LambdaTestDemo",
      console: true,
      network: true,
      visual: true,

    },
    {
      browserName: "Firefox",
      browserVersion: "89.0",
      platformName:"Windows 10",
      unhandledPromptBehavior:"ignore",
      build: "LambdaTestDemo",
      console: true,
      network: true,
      visual: true,

    }

  ],
  logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: 'https://www.lambdatest.com',
  waitforTimeout: 10000,
  waitforInterval: 100,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 1,
  path: "/wd/hub",
  hostname: "hub.lambdatest.com",
  port: 80,
  framework: 'jasmine',
  reporters: ['spec'],

  jasmineOpts: {
    helpers: [require.resolve('@babel/register')],
    defaultTimeoutInterval: 60000,
    expectationResultHandler: function (passed, assertion) {
    }
  },

  onPrepare: function (config, capabilities) {
    // make sure download directory exists
    if (!fs.existsSync(downloadDir)) {
      // if it doesn't exist, create it
      fs.mkdirSync(downloadDir);
    }
  },

  before: function (capabilities, specs) {
    browser.maximizeWindow();
  },


};
