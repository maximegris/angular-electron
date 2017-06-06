"use strict";

var packager = require('electron-packager');
const pkg = require('./package.json');
const argv = require('minimist')(process.argv.slice(1));

const appName = argv.name || pkg.name;
const buildVersion = pkg.version || '1.0';
const shouldUseAsar = argv.asar || false;
const shouldBuildAll = argv.all || false;
const arch = argv.arch || 'all';
const platform = argv.platform || 'darwin';

const DEFAULT_OPTS = {
    dir: './dist',
    name: appName,
    asar: shouldUseAsar,
    buildVersion: buildVersion
};


pack(platform, arch, function done(err, appPath) {
    if (err) {
        console.log(err);
    } else {
        console.log('Application packaged successfuly!', appPath);
    }

});

function pack(plat, arch, cb) {
    // there is no darwin ia32 electron
    if (plat === 'darwin' && arch === 'ia32') return;

    const icon = 'src/favicon';

    if (icon) {
        DEFAULT_OPTS.icon = icon + (() => {
            let extension = '.png';
            if (plat === 'darwin') {
                extension = '.icns';
            } else if (plat === 'win32') {
                extension = '.ico';
            }
            return extension;
        })();
    }

    const opts = Object.assign({}, DEFAULT_OPTS, {
        platform: plat,
        arch,
        prune: true,
        overwrite: true,
        all: shouldBuildAll,
        out: `app-builds`
    });

    console.log(opts)
    packager(opts, cb);
}
