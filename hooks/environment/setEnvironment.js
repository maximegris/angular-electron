var replace = require('replace');
var fs = require('fs-extra');
var path = require('path');

var env = process.env.ENV ? process.env.ENV : 'local';

fs.copySync(path.resolve(__dirname, './environment.ts.tpl'), path.resolve(__dirname, '../../src/app/environment.ts'));

replace({
  regex: '{{ENV}}',
  replacement: env,
  paths: ['src/app/environment.ts'],
  silent: true
});
