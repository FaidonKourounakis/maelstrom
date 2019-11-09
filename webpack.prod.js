const path = require('path')
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin')
const OptimizeCssAssterPlugin = require( 'optimize-css-assets-webpack-plugin' )
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )

module.exports = merge( common, {
    output: {
        filename: "[name].[contentHash].js",
        path: path.resolve( __dirname, 'dist' ),
    },
    mode: 'production',
    optimization: {
        minimizer: [
            new OptimizeCssAssterPlugin(),
            new TerserPlugin(),
        ]
    },
    plugins: [
        new MiniCssExtractPlugin( { 
            filename: '[name].[contentHash].css' 
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
              }
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,// 3. it creates a css file
                    "css-loader", // 2. turns css into commonjs and puts it in index.js... 
                    "sass-loader" // 1. Turns sass in css
                ]
            },
        ]
    }
})