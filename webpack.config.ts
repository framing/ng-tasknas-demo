// import { webpackConfig } from '@biznas/ng-core/webpack-config';
import { config } from './src/biz.config';

export default webpackConfig(config);

import 'ts-helpers';

import * as path from 'path';
import * as webpack from 'webpack';
import { BizConfig } from '@biznas/ng-core';

/* tslint:disable:no-var-requires variable-name */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HappyPack = require('happypack');
// const WriteFilePlugin = require('write-file-webpack-plugin');
/* tslint:enable:no-var-requires variable-name */

const dt = new Date();
const hash = '' + (dt.getFullYear() + (dt.getMonth() + 1) + dt.getDate() + dt.getHours() + dt.getMinutes());
const rootDir = path.resolve();
const distDir = path.join(rootDir, 'dist');

export function webpackConfig( config: BizConfig ): any {
  // ============================================================================

  let webpackConfig: webpack.Configuration[] = [
  {
    target: 'node',
    context: path.join(rootDir, 'src'),
    entry: {
      server: [ './biz.server.ts' ],
    },
    resolve: {
      extensions: [ '.ts', '.js' ],
      modules: [ 'node_modules', 'src' ],
      alias: {
        src: path.resolve('./src'),
      },
    },
    output: {
      path: path.join(rootDir, 'dist'),
      pathinfo: true,
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        { enforce: 'pre', test: /angular\/material/, loader: 'imports-loader?window=>global' },
        {
          enforce: 'pre',
          test: /\.ts$/,
          use: [ 'tslint-loader' ],
          exclude: /(node_modules)/,
        },
        {
          test: /\.ts$/,
          use: [ 'awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader' ],
        },
        {
          test: /\.json$/,
          use: [ 'json-loader' ],
        },
        {
          test: /\.js$/,
          use: [ 'imports-loader?define=>false', 'ng-annotate-loader' ],
        },
        {
          test: /\.html$/,
          use: [ 'raw-loader' ],
        },
        // other
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: [ 'file-loader?name=[name].[hash].[ext]' ],
        },
        {
          test: /\.css$/,
          use: [ 'to-string-loader', 'css-loader' ],
        },
        {
          test: /\.scss$/,
          use: [ 'to-string-loader', 'css-loader', 'sass-loader' ],
        },
        {
          test: /\.less$/,
          use: [ 'to-string-loader', 'css-loader?-url', 'less-loader' ],
        },
      ],
    },
    node: {
      global: true,
      __dirname: true,
      __filename: true,
      process: true,
      Buffer: true,
    },
  },
  {
    devtool: 'cheap-module-source-map',
    context: path.join(rootDir, 'src'),
    entry: {
      main: [ './biz.client.ts' ],
    },
    resolve: {
      extensions: [ '.ts', '.js' ],
      modules: [ 'node_modules', 'src' ],
      alias: {
        src: path.resolve('./src'),
      },
    },
    // devtool: 'eval', // set devtool to 'eval' to disable source maps and shave a few seconds off the build
    output: {
      path: path.join(rootDir, 'dist'),
      pathinfo: true,
      filename: '[name].js',
    },
    // disabling most of the stats as follows shaves a few seconds off the build
    stats: {
      assets: false, // Add asset Information
      assetsSort: 'field', // Sort assets by a field
      cached: false, // Add information about cached (not built) modules
      children: false, // Add children information
      chunks: false, // Add chunk information (setting this to `false` allows for a less verbose output)
      chunkModules: false, // Add built modules information to chunk information
      chunkOrigins: false, // Add the origins of chunks and chunk merging info
      chunksSort: 'field', // Sort the chunks by a field
      context: path.join(rootDir, 'dist'), // Context directory for request shortening
      errorDetails: true, // Add details to errors (like resolving log)
      hash: false, // Add the hash of the compilation
      modules: false, // Add built modules information
      modulesSort: 'field', // Sort the modules by a field
      publicPath: false, // Add public path information
      reasons: false, // Add information about the reasons why modules are included
      source: false, // Add the source code of modules
      version: true, // Add webpack version information
      warnings: true, // Add warnings
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.ts$/,
          use: [ 'happypack/loader?id=tslint' ],
          exclude: /(node_modules)/,
        },
        {
          test: /\.ts$/,
          use: [ 'happypack/loader?id=ts' ],
        },
        {
          test: /\.json$/,
          use: [ 'happypack/loader?id=json' ],
        },
        {
          test: /\.js$/,
          use: [ 'happypack/loader?id=js' ],
        },
        {
          test: /\.html$/,
          use: [ 'happypack/loader?id=html' ],
        },
        // other
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: [ 'happypack/loader?id=img' ],
        },
        {
          test: /\.css$/,
          use: [ 'happypack/loader?id=css' ],
        },
        {
          test: /\.scss$/,
          use: [ 'happypack/loader?id=scss' ],
        },
        {
          test: /\.less$/,
          use: [ 'happypack/loader?id=less' ],
        },
      ],
    },

    plugins: [
      new HappyPack({
        loaders: {
          id: 'tslint',
          loaders: [ 'tslint-loader' ],
        },
      }),
      new HappyPack({
        loaders: {
          id: 'ts',
          loaders: [ 'awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader' ],
        },
      }),
      new HappyPack({
        loaders: {
          id: 'json',
          loaders: [ 'json-loader' ],
        },
      }),
      new HappyPack({
        loaders: {
          id: 'js',
          loaders: [ 'imports-loader?define=>false', 'ng-annotate-loader' ],
        },
      }),
      new HappyPack({
        loaders: {
          id: 'html',
          loaders: [ 'raw-loader' ],
        },
      }),
      new HappyPack({
        loaders: {
          id: 'img',
          loaders: [ 'file-loader?name=[name].[hash].[ext]' ],
        },
      }),
      new HappyPack({
        loaders: {
          id: 'css',
          loaders: [ 'to-string-loader', 'css-loader' ],
        },
      }),
      new HappyPack({
        loaders: {
          id: 'scss',
          loaders: [ 'to-string-loader', 'css-loader', 'sass-loader' ],
        },
      }),
      new HappyPack({
        loaders: {
          id: 'less',
          loaders: [ 'to-string-loader', 'css-loader-url', 'less-loader' ],
        },
      }),
      new CopyWebpackPlugin(
        [
          { from: './src/*.ico', to: distDir }, // copy icons
        ],
        {
          debug: 'warning', // set to 'info' to for copy debug output
          ignore: [], // set any files to ignore here
        },
      ),

      new HtmlWebpackPlugin({
        template: path.join(rootDir, 'src/index.html'),
        hash: true, // cache bust automatically added entry scripts
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        },
        templateParams: {
          cacheBust: '?v=' + hash, // using this for cache busting
        },
      }),

      // prefetching key modules speeds up the webpack build process
      new webpack.PrefetchPlugin('./node_modules'),

      // new webpack.IgnorePlugin(/^\.\/locale$/, [ /moment$/ ]), // saves ~100k from build

      new webpack.optimize.AggressiveMergingPlugin({}),

      // https://github.com/angular/angular/issues/11580
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        path.join(rootDir, 'src'),
      ),

      new webpack.LoaderOptionsPlugin({
        options: {
          /**
           * Static analysis linter for TypeScript advanced options configuration
           * Description: An extensible linter for the TypeScript language.
           *
           * See: https://github.com/wbuchwalter/tslint-loader
           */
          tslint: {
            emitErrors: true,
            failOnHint: false,
          },
        },
      }),

      // Enable compression of bundles
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],

    devServer: {
      contentBase: path.join(rootDir, 'dist'),
      filename: 'main.js',
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
      publicPath: '/',
      stats: { colors: true },
      host: '0.0.0.0',
      port: 8080,
    },
  },
  ];

  // ============================================================================

  let progressBarPlugin = true;
  let releaseBuild = false;
  let buildConfig = 'build-config.debug.json';
  let devServer = false;

  for (let arg of process.argv) {
    if (arg.includes('webpack-dev-server')) {
      // webpack-dev-server has been run
      devServer = true;
      // webpackConfig.plugins.push(new WriteFilePlugin()); // enable this to force webpack-dev-server to output files to /dist
      console.log('Webpack-dev-server running');
    } else if (arg === '--progress') {
      // disable the progress bar plugin if user has asked for --progress
      progressBarPlugin = false;
    } else if (arg.includes('--env')) {
      // environment variable has been specified
      if (
        arg === '--env.debug' ||
        arg === '--env.release') {
      } else {
        // invalid environment variable
        throw 'Invalid --env parameter';
      }
    }

    if (arg.includes('--env.release')) {
      releaseBuild = true;
      buildConfig = 'build-config.release.json';
    } else {
    }
  }

  console.log('Using build-config alias ' + buildConfig);
  (webpackConfig[1].resolve.alias as any)['build-config'] = path.join(rootDir, 'node_modules/@biznas/ng-core', buildConfig);

  if (releaseBuild) {
    // production build
    console.log('Production build');

    // add production plugins
    console.log('Adding production build plugins');

    webpackConfig[1].plugins = webpackConfig[1].plugins.concat(
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') } ),

      new webpack.LoaderOptionsPlugin({
        // https://medium.com/modus-create-front-end-development/webpack-2-tree-shaking-configuration-9f1de90f3233
        minimize: true,
        debug: false,
      }),

      new webpack.optimize.UglifyJsPlugin(),
    );
  } else {
    // development build
    console.log('Development build');
  }

  if (progressBarPlugin) {
    console.log('Default progress bar');
    webpackConfig[1].plugins.push(new ProgressBarPlugin({ clear: false }));
  }

  if (!devServer) {
    console.log('Cleaning dist folder');
    webpackConfig[1].plugins.push(new CleanWebpackPlugin([ 'dist' ]));
  }

  // ============================================================================

  return webpackConfig;
}