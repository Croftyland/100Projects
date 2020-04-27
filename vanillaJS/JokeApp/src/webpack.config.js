const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    target:'node',
    entry: ['babel-polyfill','./js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",

    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 25000,
                    },
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/public/index.html",
            inject: 'body'
        })
    ],
    devServer: {
        contentBase: './public',
        port: 8080,
    }
};
