const path = require('path')
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )

const SRC = path.resolve(__dirname, 'node_modules');

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
                test: /\.(svg|png|jpg|jpeg|gif|mp3|toml)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'assets'
                    }
                }
            },
            {
              test: /\.toml$/,
              use: {
                  loader: 'file-loader',
                  options: {
                      name: '[name].[ext]',
                      outputPath: '/'
                  }
              }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      plugins: [
                        'babel-plugin-transform-class-properties'
                      ]
                    }
                  }
            },
            {
                test: /\.(mp3|wav|wma|ogg)$/,
                use: {
                  loader: 'file-loader',
                //   include: SRC,
                  options: {
                    name: '[name].[contenthash].[ext]',
                    outputPath: 'assets/audio/',
                    publicPath: 'assets/audio/'
                  }
                }
              },
        ]
    }
}