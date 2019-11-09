const path = require('path')
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )



module.exports = {
    entry: "./src/index.js",
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader',]
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'assets'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                  }
            }
        ]
    }
}