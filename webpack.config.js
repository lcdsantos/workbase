var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './src/js/main.js'
        },
        output: {
            path: path.resolve(__dirname, 'assets/js'),
            filename: '[name].js'
        },
        externals: {
            // require("jquery") is external and available
            // on the global var jQuery
            'jquery': 'jQuery'
        },
        cache: true,
        devtool: (env === 'production') ? false : 'eval',
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: module => /node_modules/.test(module.resource)
            }),
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery',
                'window.jQuery': 'jquery'
            })
        ],
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules|bower_components|vendor/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }, {
                test: /\.js$/,
                exclude: /node_modules|bower_components|vendor/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        fix: true
                    }
                },
                enforce: 'pre'
            }]
        }
    };
};
