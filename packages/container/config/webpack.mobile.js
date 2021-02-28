/**
 *  webpack config to build using cordova
 */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const BuildMobilePlugin = require('../plugins/build-mobile-plugin');
const commonConfig  = require('./webpack.prod');

 const mobileConfig = {
    mode: 'production',
    output: {
        path: path.resolve('cordova/www'),
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/'
    },
    plugins: [
        new HtmlWebpackTagsPlugin({
            tags: [ 'cordova.js' ],
            usePublicPath: false
        }),
        new BuildMobilePlugin({
            platform: 'android',
            release: ''
        })
    ]
}

module.exports = merge(commonConfig, mobileConfig);
