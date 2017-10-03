var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
    return {
        entry: './src/js/main.js',
        output: {
            path: path.join(__dirname, 'assets/js'),
            filename: 'bundle.js'
        },
        externals: {
            // require("jquery") is external and available
            // on the global var jQuery
            'jquery': 'jQuery'
        },
        cache: true,
        devtool: (env === 'production') ? false : 'eval',
        plugins: [
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
                loader: 'eslint-loader',
                enforce: 'pre'
            }]
        }
    };
};
