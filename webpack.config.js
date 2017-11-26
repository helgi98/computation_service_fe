const webpack = require('webpack');
const path = require('path');

const DEFAULT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(__dirname, 'build');
const APP_PATH = path.resolve(__dirname, 'src');

const config = {
    entry: APP_PATH + '/index.js',
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    devServer: {
        inline:true,
        port: 9000,
        contentBase: "./build"
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: APP_PATH,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            }
        ]
    }
};

module.exports = config;