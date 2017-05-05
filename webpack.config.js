"use strict";
exports.__esModule = true;
// import { webpackConfig } from '@biznas/ng-core/webpack-config';
var biz_config_1 = require("./src/biz.config");
exports["default"] = webpackConfig(biz_config_1.config);
require("ts-helpers");
var path = require("path");
var webpack = require("webpack");
/* tslint:disable:no-var-requires variable-name */
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var HappyPack = require('happypack');
// const WriteFilePlugin = require('write-file-webpack-plugin');
/* tslint:enable:no-var-requires variable-name */
var dt = new Date();
var hash = '' + (dt.getFullYear() + (dt.getMonth() + 1) + dt.getDate() + dt.getHours() + dt.getMinutes());
var rootDir = path.resolve();
var distDir = path.join(rootDir, 'dist');
function webpackConfig(config) {
    // ============================================================================
    var webpackConfig = [
        {
            target: 'node',
            context: path.join(rootDir, 'src'),
            entry: {
                server: ['./biz.server.ts']
            },
            resolve: {
                extensions: ['.ts', '.js'],
                modules: ['node_modules', 'src'],
                alias: {
                    src: path.resolve('./src')
                }
            },
            output: {
                path: path.join(rootDir, 'dist'),
                pathinfo: true,
                filename: '[name].js',
                libraryTarget: 'commonjs2'
            },
            module: {
                rules: [
                    { enforce: 'pre', test: /angular\/material/, loader: 'imports-loader?window=>global' },
                    {
                        enforce: 'pre',
                        test: /\.ts$/,
                        use: ['tslint-loader'],
                        exclude: /(node_modules)/
                    },
                    {
                        test: /\.ts$/,
                        use: ['awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader']
                    },
                    {
                        test: /\.json$/,
                        use: ['json-loader']
                    },
                    {
                        test: /\.js$/,
                        use: ['imports-loader?define=>false', 'ng-annotate-loader']
                    },
                    {
                        test: /\.html$/,
                        use: ['raw-loader']
                    },
                    // other
                    {
                        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                        use: ['file-loader?name=[name].[hash].[ext]']
                    },
                    {
                        test: /\.css$/,
                        use: ['to-string-loader', 'css-loader']
                    },
                    {
                        test: /\.scss$/,
                        use: ['to-string-loader', 'css-loader', 'sass-loader']
                    },
                    {
                        test: /\.less$/,
                        use: ['to-string-loader', 'css-loader?-url', 'less-loader']
                    },
                ]
            },
            node: {
                global: true,
                __dirname: true,
                __filename: true,
                process: true,
                Buffer: true
            }
        },
        {
            devtool: 'cheap-module-source-map',
            context: path.join(rootDir, 'src'),
            entry: {
                main: ['./biz.client.ts']
            },
            resolve: {
                extensions: ['.ts', '.js'],
                modules: ['node_modules', 'src'],
                alias: {
                    src: path.resolve('./src')
                }
            },
            // devtool: 'eval', // set devtool to 'eval' to disable source maps and shave a few seconds off the build
            output: {
                path: path.join(rootDir, 'dist'),
                pathinfo: true,
                filename: '[name].js'
            },
            // disabling most of the stats as follows shaves a few seconds off the build
            stats: {
                assets: false,
                assetsSort: 'field',
                cached: false,
                children: false,
                chunks: false,
                chunkModules: false,
                chunkOrigins: false,
                chunksSort: 'field',
                context: path.join(rootDir, 'dist'),
                errorDetails: true,
                hash: false,
                modules: false,
                modulesSort: 'field',
                publicPath: false,
                reasons: false,
                source: false,
                version: true,
                warnings: true
            },
            module: {
                rules: [
                    {
                        enforce: 'pre',
                        test: /\.ts$/,
                        use: ['happypack/loader?id=tslint'],
                        exclude: /(node_modules)/
                    },
                    {
                        test: /\.ts$/,
                        use: ['happypack/loader?id=ts']
                    },
                    {
                        test: /\.json$/,
                        use: ['happypack/loader?id=json']
                    },
                    {
                        test: /\.js$/,
                        use: ['happypack/loader?id=js']
                    },
                    {
                        test: /\.html$/,
                        use: ['happypack/loader?id=html']
                    },
                    // other
                    {
                        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                        use: ['happypack/loader?id=img']
                    },
                    {
                        test: /\.css$/,
                        use: ['happypack/loader?id=css']
                    },
                    {
                        test: /\.scss$/,
                        use: ['happypack/loader?id=scss']
                    },
                    {
                        test: /\.less$/,
                        use: ['happypack/loader?id=less']
                    },
                ]
            },
            plugins: [
                new HappyPack({
                    loaders: {
                        id: 'tslint',
                        loaders: ['tslint-loader']
                    }
                }),
                new HappyPack({
                    loaders: {
                        id: 'ts',
                        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader']
                    }
                }),
                new HappyPack({
                    loaders: {
                        id: 'json',
                        loaders: ['json-loader']
                    }
                }),
                new HappyPack({
                    loaders: {
                        id: 'js',
                        loaders: ['imports-loader?define=>false', 'ng-annotate-loader']
                    }
                }),
                new HappyPack({
                    loaders: {
                        id: 'html',
                        loaders: ['raw-loader']
                    }
                }),
                new HappyPack({
                    loaders: {
                        id: 'img',
                        loaders: ['file-loader?name=[name].[hash].[ext]']
                    }
                }),
                new HappyPack({
                    loaders: {
                        id: 'css',
                        loaders: ['to-string-loader', 'css-loader']
                    }
                }),
                new HappyPack({
                    loaders: {
                        id: 'scss',
                        loaders: ['to-string-loader', 'css-loader', 'sass-loader']
                    }
                }),
                new HappyPack({
                    loaders: {
                        id: 'less',
                        loaders: ['to-string-loader', 'css-loader-url', 'less-loader']
                    }
                }),
                new CopyWebpackPlugin([
                    { from: './src/*.ico', to: distDir },
                ], {
                    debug: 'warning',
                    ignore: []
                }),
                new HtmlWebpackPlugin({
                    template: path.join(rootDir, 'src/index.html'),
                    hash: true,
                    minify: {
                        collapseWhitespace: true,
                        removeComments: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    },
                    templateParams: {
                        cacheBust: '?v=' + hash
                    }
                }),
                // prefetching key modules speeds up the webpack build process
                new webpack.PrefetchPlugin('./node_modules'),
                // new webpack.IgnorePlugin(/^\.\/locale$/, [ /moment$/ ]), // saves ~100k from build
                new webpack.optimize.AggressiveMergingPlugin({}),
                // https://github.com/angular/angular/issues/11580
                new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(rootDir, 'src')),
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
                            failOnHint: false
                        }
                    }
                }),
                // Enable compression of bundles
                new CompressionPlugin({
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.js$|\.css$|\.html$/,
                    threshold: 10240,
                    minRatio: 0.8
                }),
            ],
            devServer: {
                contentBase: path.join(rootDir, 'dist'),
                filename: 'main.js',
                watchOptions: {
                    aggregateTimeout: 300,
                    poll: 1000
                },
                publicPath: '/',
                stats: { colors: true },
                host: '0.0.0.0',
                port: 8080
            }
        },
    ];
    // ============================================================================
    var progressBarPlugin = true;
    var releaseBuild = false;
    var buildConfig = 'build-config.debug.json';
    var devServer = false;
    for (var _i = 0, _a = process.argv; _i < _a.length; _i++) {
        var arg = _a[_i];
        if (arg.includes('webpack-dev-server')) {
            // webpack-dev-server has been run
            devServer = true;
            // webpackConfig.plugins.push(new WriteFilePlugin()); // enable this to force webpack-dev-server to output files to /dist
            console.log('Webpack-dev-server running');
        }
        else if (arg === '--progress') {
            // disable the progress bar plugin if user has asked for --progress
            progressBarPlugin = false;
        }
        else if (arg.includes('--env')) {
            // environment variable has been specified
            if (arg === '--env.debug' ||
                arg === '--env.release') {
            }
            else {
                // invalid environment variable
                throw 'Invalid --env parameter';
            }
        }
        if (arg.includes('--env.release')) {
            releaseBuild = true;
            buildConfig = 'build-config.release.json';
        }
        else {
        }
    }
    console.log('Using build-config alias ' + buildConfig);
    webpackConfig[1].resolve.alias['build-config'] = path.join(rootDir, 'node_modules/@biznas/ng-core', buildConfig);
    if (releaseBuild) {
        // production build
        console.log('Production build');
        // add production plugins
        console.log('Adding production build plugins');
        webpackConfig[1].plugins = webpackConfig[1].plugins.concat(new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }), new webpack.LoaderOptionsPlugin({
            // https://medium.com/modus-create-front-end-development/webpack-2-tree-shaking-configuration-9f1de90f3233
            minimize: true,
            debug: false
        }), new webpack.optimize.UglifyJsPlugin());
    }
    else {
        // development build
        console.log('Development build');
    }
    if (progressBarPlugin) {
        console.log('Default progress bar');
        webpackConfig[1].plugins.push(new ProgressBarPlugin({ clear: false }));
    }
    if (!devServer) {
        console.log('Cleaning dist folder');
        webpackConfig[1].plugins.push(new CleanWebpackPlugin(['dist']));
    }
    // ============================================================================
    return webpackConfig;
}
exports.webpackConfig = webpackConfig;
