const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const customProperties = require('postcss-custom-properties');

const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, DefinePlugin, NamedModulesPlugin } = require('webpack');
const { BaseHrefWebpackPlugin, NamedLazyChunksWebpackPlugin, InsertConcatAssetsWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const ConcatPlugin = require('webpack-concat-plugin');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline", "polyfills", "sw-register", "styles", "vendor", "main"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";

const postcssPlugins = function () {
  // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
  const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
  const minimizeOptions = {
      autoprefixer: false,
      safe: true,
      mergeLonghand: false,
      discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
  };
  return [
      postcssUrl({
          url: (obj) => {
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
          }
      }),
      autoprefixer(),
      customProperties({ preserve: true })
  ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};

const isProd = (process.env.NODE_ENV === 'production');

//add all external css to be added in our index.html--> like as if it's .angular-cli.json
const styles = [
  "./src/styles.scss"
];

//we add all our external scripts we want to load externally, like inserting in our index.html --> like as if it's .angular-cli.json
const scripts = [
];

//create file path for each , so we use for our excludes and includes where needed
let style_paths = styles.map(style_src => path.join(process.cwd(), style_src));

function getPlugins() {
  var plugins = [];

  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  plugins.push(new DefinePlugin({
    "process.env.NODE_ENV": "\"production\""
  }));

  plugins.push(new NoEmitOnErrorsPlugin());

  if (scripts.length > 0) {
    plugins.push(new ConcatPlugin({
      "uglify": false,
      "sourceMap": true,
      "name": "scripts",
      "fileName": "[name].bundle.js",
      "filesToConcat": scripts
    }));
    plugins.push(new InsertConcatAssetsWebpackPlugin([
      "scripts"
    ]));
  }

  plugins.push(new CopyWebpackPlugin([
    {
      "context": "src",
      "to": "",
      "from": {
        "glob": "assets/**/*",
        "dot": true
      }
    },
    {
      "context": "src",
      "to": "",
      "from": {
        "glob": "favicon.ico",
        "dot": true
      }
    }
  ], {
    "ignore": [
      ".gitkeep"
    ],
    "debug": "warning"
  }));

  plugins.push(new ProgressPlugin());

  plugins.push(new CircularDependencyPlugin({
    "exclude": /(\\|\/)node_modules(\\|\/)/,
    "failOnError": false
  }));

  plugins.push(new NamedLazyChunksWebpackPlugin());

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
    "name": [
      "inline"
    ],
    "minChunks": null
  }));

  plugins.push(new CommonsChunkPlugin({
    "name": [
      "vendor"
    ],
    "minChunks": (module) => {
              return module.resource
                  && (module.resource.startsWith(nodeModules)
                      || module.resource.startsWith(genDirNodeModules)
                      || module.resource.startsWith(realNodeModules));
          },
    "chunks": [
      "main"
    ]
  }));

  plugins.push(new SourceMapDevToolPlugin({
    "filename": "[file].map[query]",
    "moduleFilenameTemplate": "[resource-path]",
    "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
    "sourceRoot": "webpack:///"
  }));

  plugins.push(new CommonsChunkPlugin({
    "name": [
      "main"
    ],
    "minChunks": 2,
    "async": "common"
  }));

  plugins.push(new NamedModulesPlugin({}));

  if (isProd) {
    plugins.push(new AngularCompilerPlugin({
      "mainPath": "main.ts",
      "platform": 0,
      "sourceMap": true,
      "tsConfigPath": "src/tsconfig.app.json",
      "skipCodeGeneration": true,
      "compilerOptions": {},
      "hostReplacementPaths": {
        "environments/index.ts": "environments/index.prod.ts"
      },
      "exclude": []
    }));

    plugins.push(new UglifyJsPlugin({
      "sourceMap": false
    }));

  } else {
    plugins.push(new AngularCompilerPlugin({
      "mainPath": "main.ts",
      "platform": 0,
      "sourceMap": true,
      "tsConfigPath": "src/tsconfig.app.json",
      "skipCodeGeneration": true,
      "compilerOptions": {},
      "hostReplacementPaths": {
        "environments/index.ts": "environments/index.ts"
      },
      "exclude": []
    }));
  }

  return plugins;
}

module.exports = {
  "devtool": "source-map",
  "externals": {
    "electron": "require('electron')",
    "buffer": "require('buffer')",
    "child_process": "require('child_process')",
    "crypto": "require('crypto')",
    "events": "require('events')",
    "fs": "require('fs')",
    "http": "require('http')",
    "https": "require('https')",
    "assert": "require('assert')",
    "dns": "require('dns')",
    "net": "require('net')",
    "os": "require('os')",
    "path": "require('path')",
    "querystring": "require('querystring')",
    "readline": "require('readline')",
    "repl": "require('repl')",
    "stream": "require('stream')",
    "string_decoder": "require('string_decoder')",
    "url": "require('url')",
    "util": "require('util')",
    "zlib": "require('zlib')"
  },
  "resolve": {
    "extensions": [
      ".ts",
      ".js",
      ".scss",
      ".json"
    ],
    "aliasFields": [],
    "alias": { // WORKAROUND See. angular-cli/issues/5433
      "environments": isProd ? path.resolve(__dirname, 'src/environments/index.prod.ts') : path.resolve(__dirname, 'src/environments/index.ts')
    },
    "modules": [
      "./node_modules"
    ],
    "mainFields": [
      "browser",
      "module",
      "main"
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
    "styles": styles
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].bundle.js",
    "chunkFilename": "[id].chunk.js",
    "crossOriginLoading": false
  },
  "module": {
    "rules": [
      {
        "test": /\.html$/,
        "use": ["html-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|json|xml|ico|cur|ani)$/,
        "use": ["file-loader?name=[path][name].[ext]"]
      },
      {
        "exclude": style_paths,
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "exclude": style_paths,
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "exclude": style_paths,
        "test": /\.less$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": style_paths,
        "test": /\.styl$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "include": style_paths,
        "test": /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "include": style_paths,
        "test": /\.scss$|\.sass$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "include":style_paths,
        "test": /\.less$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "include": style_paths,
        "test": /\.styl$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "test": /\.ts$/,
        "use": "@ngtools/webpack"
      }
    ]
  },
  "plugins": getPlugins(),
  "node": {
    fs: "empty",
    global: true,
    crypto: "empty",
    tls: "empty",
    net: "empty",
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    __dirname: false,
    __filename: false
  },
  "devServer": {
    "historyApiFallback": true
  }
};
