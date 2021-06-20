const APPLICATION = require('spectron').Application;
const ELECTRON_PATH = require('electron'); // Require Electron from the binaries included in node_modules.
const PATH = require('path');

export default function setup(): void {
  beforeEach(async () => {
    this.app = new APPLICATION({
      // Your electron path can be any binary
      // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
      // But for the sake of the example we fetch it from our node_modules.
      path: ELECTRON_PATH,

      // Assuming you have the following directory structure

      //  |__ my project
      //     |__ ...
      //     |__ main.js
      //     |__ package.json
      //     |__ index.html
      //     |__ ...
      //     |__ test
      //        |__ spec.js  <- You are here! ~ Well you should be.

      // The following line tells spectron to look and use the main.js file
      // and the package.json located 1 level above.
      args: [PATH.join(__dirname, '..')],
      webdriverOptions: {}
    });

    await this.app.start();
  });

  afterEach(async () => {
    if (this.app && this.app.isRunning()) {
      await this.app.stop();
    }
  });
}
