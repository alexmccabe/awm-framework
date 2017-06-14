/*jslint*/
/*global __dirname*/
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

let files = glob.sync(path.resolve(__dirname, '../src/js/pages/**/*.js'));
let entry = {};

files.forEach(file => {
    let name = file.match(/([^\/]*)\.(\w+)$/)[1];

    if (name && name.length) {
        entry[name] = file;
    }
});

entry.vendor = ['jquery'];

module.exports = {
    entry: entry,
    output: {
        filename: '[name].js',
    },

    resolve: {
        alias: {
            '@': path.join(__dirname, '..', 'src'),
            'vue$': 'vue/dist/vue.esm.js',
            jquery: 'jquery/src/jquery'
        }
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            vue: 'Vue',
            'window.vue': 'Vue'
        })
    ],

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },

            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
            }
        ]
    },

    plugins: [
    ]
};
