const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src-frontend/store'],
    output: {
        path: path.resolve('./public'),
        filename: 'js/bundle/bundle.js'
    },
    module: {
        //Validate by ESLint before loading
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint']
            }
        ],
        loaders: [
            //Compile ES6/7 to ES5 via babel
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            //LESS
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        //Extract css to file
        new ExtractTextPlugin('stylesheets/bundle/bundle.css')
    ],

    // Pretty terminal output
    stats: {colors: true},

    // Generate external sourcemaps for the JS & CSS bundles
    devtool: 'source-map',

    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};