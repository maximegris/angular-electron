const APPLICATION = require('spectron').Application;
const ELECTRON_PATH = require('electron'); // Require Electron from the binaries included in node_modules.
const PATH = require('path');

export default function setup(): void {
  beforeEach(async function() {
    this.app = new APPLICATION({
      // Your electron path can be any binary
      // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
      // But for the sake of the example we fetch it from our node_modules.
      path: ELECTRON_PATH,
      // The following line tells spectron to look and use the main.js file
      // and the package.json located in app folder.
      args: [PATH.join(__dirname, '../app/main.js'), PATH.join(__dirname, '../app/package.json')],
      webdriverOptions: {}
    });

    await this.app.start();
  });

  afterEach(async function() {
    if (this.app && this.app.isRunning()) {
      await this.app.stop();
    }
  });
}
