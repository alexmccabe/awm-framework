/*jslint*/
/*global __dirname*/
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

let config = {
    /**
     * Input file(s). These files will be compiled and output into the
     * output directory. This output dir is handled by Gulp.
     *
     * Minimum of 1 file required to run.
     * @type {string}
     */
    entryDir: path.resolve(__dirname, '../src/js/app-chunks/**/*.js'),

    /**
     * Add any live dependencies into this array. This will bundle them all up into
     * a single vendors.bundle.js file.
     *
     * You may need to make aliases and ProvidePlugin aliases for the modules, to
     * get them to register in the global space correctly.
     *
     * Some common libraries are already included in the array, just uncomment them
     * and they will be bundled. They have to be installed first though.
     *
     * - yarn add {library-name}
     * - npm install {library-name} --save
     * @type {Array}
     */
    libraries: [
        // 'axios',
        // 'flickity',
        // 'jquery',
    ]
};










let files = glob.sync(config.entryDir);
let entry = {};

(config.libraries.length) ? entry.vendor = config.libraries : null;

files.forEach(file => {
    let name = file.match(/([^\/]*)\.(\w+)$/)[1];

    if (name && name.length) {
        entry[name] = file;
    }
});


if (!Object.keys(entry).length) {
    throw 'No entry files detected. Aborting.';
}

module.exports = {
    entry: entry,
    output: {
        filename: '[name].js',
    },

    devtool: 'source-map',

    resolve: {
        alias: {
            '@': path.join(__dirname, '..', 'src'),
            'vue$': 'vue/dist/vue.esm.js',
            jquery: 'jquery/src/jquery',
            axios: 'axios/lib/axios',
        }
    },

    plugins: [
        /**
         * Module aliases. This makes sure that Webpack can find the modules
         * by the correct reference.
         *
         * Update as required.
         */
        new webpack.ProvidePlugin({
            'axios': 'axios',
            'window.axios': 'axios',

            'window.Flickity': 'flickity',
            'Flickity': 'flickity',

            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',

            'vue': 'Vue',
            'window.vue': 'Vue',
        }),

        /**
         * Bundle all vendor modules into a single script.
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: 2
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
};
