const path = require('path')
const common = require('./webpack.common');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )

module.exports = merge( common, {
    output: {
        filename: "[name].js",
        path: path.resolve( __dirname, 'dist' ),
    },
    mode: 'development',
    devtool: 'inline-source-map', // maps the errors to our precompiled code
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",// 3. it injects the commonjs css into the html file
                    "css-loader", // 2. turns css into commonjs and puts it in index.js... 
                    "sass-loader" // 1. Turns sass in css
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html',
        })
    ]
})