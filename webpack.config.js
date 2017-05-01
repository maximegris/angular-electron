const path = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');

const { NoEmitOnErrorsPlugin, LoaderOptionsPlugin, DefinePlugin, HashedModuleIdsPlugin } = require('webpack');
const { GlobCopyWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin, UglifyJsPlugin } = require('webpack').optimize;
const { AotPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const baseHref = "";
const deployUrl = "";

const isProd = (process.env.NODE_ENV === 'production');

function getPlugins() {
  var plugins = [];

  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  plugins.push(new DefinePlugin({
    "process.env.NODE_ENV": "\"production\""
  }));

  plugins.push(new NoEmitOnErrorsPlugin());

  plugins.push(new GlobCopyWebpackPlugin({
    "patterns": [
      "assets",
      "favicon.ico"
    ],
    "globOptions": {
      "cwd": "C:\\_PROJECTS\\_PERSO\\angular-electron\\src",
      "dot": true,
      "ignore": "**/.gitkeep"
    }
  }));

  plugins.push(new ProgressPlugin());

  plugins.push(new HtmlWebpackPlugin({
    "template": "./src/index.html",
    "filename": "./index.html",
    "hash": false,
    "inject": true,
    "compile": true,
    "favicon": false,
    "minify": false,
    "cache": true,
    "showErrors": true,
    "chunks": "all",
    "excludeChunks": [],
    "title": "Webpack App",
    "xhtml": true,
    "chunksSortMode": function sort(left, right) {
      let leftIndex = entryPoints.indexOf(left.names[0]);
      let rightindex = entryPoints.indexOf(right.names[0]);
      if (leftIndex > rightindex) {
          return 1;
      }
      else if (leftIndex < rightindex) {
          return -1;
      }
      else {
          return 0;
      }
    }
  }));

  plugins.push(new BaseHrefWebpackPlugin({}));

  plugins.push(new CommonsChunkPlugin({
    "name": "inline",
    "minChunks": null
  }));

  plugins.push(new CommonsChunkPlugin({
    "name": "vendor",
    "minChunks": (module) => module.resource && module.resource.startsWith(nodeModules),
    "chunks": [
      "main"
    ]
  }));

  plugins.push(new ExtractTextPlugin({
    "filename": "[name].bundle.css",
    "disable": true
  }));

  plugins.push(new LoaderOptionsPlugin({
    "sourceMap": false,
    "options": {
      "postcss": [
        autoprefixer(),
        postcssUrl({"url": (obj) => {
          // Only convert root relative URLs, which CSS-Loader won't process into require().
          if (!obj.url.startsWith('/') || obj.url.startsWith('//')) {
              return obj.url;
          }
          if (deployUrl.match(/:\/\//)) {
              // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
              return `${deployUrl.replace(/\/$/, '')}${obj.url}`;
          }
          else if (baseHref.match(/:\/\//)) {
              // If baseHref contains a scheme, include it as is.
              return baseHref.replace(/\/$/, '') +
                  `/${deployUrl}/${obj.url}`.replace(/\/\/+/g, '/');
          }
          else {
              // Join together base-href, deploy-url and the original URL.
              // Also dedupe multiple slashes into single ones.
              return `/${baseHref}/${deployUrl}/${obj.url}`.replace(/\/\/+/g, '/');
          }
      }})
      ],
      "sassLoader": {
        "sourceMap": false,
        "includePaths": []
      },
      "lessLoader": {
        "sourceMap": false
      },
      "context": ""
    }
  }));

  if(isProd) {
    plugins.push(new HashedModuleIdsPlugin({
      "hashFunction": "md5",
      "hashDigest": "base64",
      "hashDigestLength": 4
    }));

    plugins.push(new AotPlugin({
      "mainPath": "main.ts",
      "hostReplacementPaths": {
        "environments/index.ts": "environments/index.prod.ts"
      },
      "exclude": [],
      "tsConfigPath": "src/tsconfig.app.json"
    }));

    plugins.push(new UglifyJsPlugin({
      "mangle": {
        "screw_ie8": true
      },
      "compress": {
        "screw_ie8": true,
        "warnings": false
      },
      "sourceMap": false
    }));

  } else {
    plugins.push( new AotPlugin({
      "mainPath": "main.ts",
      "hostReplacementPaths": {
        "environments/index.ts": "environments/index.ts"
      },
      "exclude": [],
      "tsConfigPath": "src/tsconfig.app.json",
      "skipCodeGeneration": true
    }));
  }

  return plugins;
}

module.exports = {
  "devtool": "source-map",
  "externals": {
    "child_process": 'require(\'child_process\')',
    "electron": 'require(\'electron\')'
  },
  "resolve": {
    "extensions": [
      ".ts",
      ".js",
       ".scss"
    ],
    "aliasFields": [],
    "alias": { // WORKAROUND See. angular-cli/issues/5433
      "environments": isProd ? path.resolve(__dirname, 'src/environments/index.prod.ts') : path.resolve(__dirname, 'src/environments/index.ts')
    },
    "modules": [
      "./node_modules"
    ]
  },
  "resolveLoader": {
    "modules": [
      "./node_modules"
    ]
  },
  "entry": {
    "main": [
      "./src/main.ts"
    ],
    "polyfills": [
      "./src/polyfills.ts"
    ],
    "styles": [
      "./src/styles.scss"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].bundle.js",
    "chunkFilename": "[id].chunk.js"
  },
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": /\.js$/,
        "loader": "source-map-loader",
        "exclude": [
          /\/node_modules\//
        ]
      },
      {
        "test": /\.json$/,
        "loader": "json-loader"
      },
      {
        "test": /\.html$/,
        "loader": "html-loader"
      },
      {
        "test": /\.(eot|svg)$/,
        "loader": "file-loader?name=[name].[hash:20].[ext]"
      },
      {
        "test": /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.css$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
          "postcss-loader"
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.scss$|\.sass$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.less$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.styl$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
          "postcss-loader",
          "stylus-loader?{\"sourceMap\":false,\"paths\":[]}"
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.css$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
            "postcss-loader"
          ],
          "fallback": "style-loader",
          "publicPath": ""
        })
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.scss$|\.sass$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
            "postcss-loader",
            "sass-loader"
          ],
          "fallback": "style-loader",
          "publicPath": ""
        })
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.less$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
            "postcss-loader",
            "less-loader"
          ],
          "fallback": "style-loader",
          "publicPath": ""
        })
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.scss")
        ],
        "test": /\.styl$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
            "postcss-loader",
            "stylus-loader?{\"sourceMap\":false,\"paths\":[]}"
          ],
          "fallback": "style-loader",
          "publicPath": ""
        })
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack"
      }
    ]
  },
  "plugins": getPlugins(),
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  }
};
