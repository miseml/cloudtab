const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: { index: './src/index.js', background: './src/background.js' },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/manifest.json' },
                { from: './src/index.css' }
            ],
        }),
    ],
    output: { filename: '[name].js', path: path.resolve(__dirname, 'dist') },
};
