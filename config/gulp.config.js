/* ==========================================================================
   #Gulp Configuration
   ========================================================================== */

/**
 * 1. The reason we always say expanded with sourcemaps, is because the minify
 *    process removes all comments and whitespace.
 */

const argv        = require('yargs').argv;

let config = {};
config.isProduction = !!argv.production;
config.isDev = !config.isProduction;

config.dirs = {
    in: 'src',
    out: './public',
    dist: './dist'
};

config.manifest = {
    dir: `${(config.isProduction) ? config.dirs.dist : config.dirs.out}/assets/manifests`,
    revOptions: {
        // merge: true,
        path: 'rev-manifest.json'
    }
};


config.css = {
    in: `${config.dirs.in}/scss/**/*.{css,scss}`,
    out: `${config.dirs.out}/assets/css`,
    clean: false,

    rubySassOptions: { /* [1] */
        lineNumbers: true,
        sourcemap: true,
        style: 'expanded'
    },

    minSuffix: '.min',
};

config.scripts = {
    in: [
        `${config.dirs.in}/js/**/*.{js,jsx}`,
        `!${config.dirs.in}/js/**/*.map`,
        `${config.dirs.in}/components/**/*.{handlebars}`,
    ],
    out: `${(config.isProduction) ? config.dirs.dist : config.dirs.out}/assets/js`,
    clean: false,

    uglifyOptions: {},

    webpack: require('./webpack.config'),

    minSuffix: '.min',
};

config.fonts = {
    in: `${config.dirs.in}/fonts/**/*.{ttf,woff,woff2,eot,svg}`,
    out: `${config.dirs.out}/assets/fonts`,
    clean: true,
};

config.html = {
    in: `${config.dirs.in}/html/**/*.html`,
    out: (config.isProduction) ? config.dirs.dist : config.dirs.out,
    clean: true,
};

config.images = {
    in: `${config.dirs.in}/images/**/*.{png,jpg,jpeg,gif,svg}`,
    out: `${config.dirs.out}/assets/images`,
    clean: true,
    imageMinOptions: {
        svgo: {
            plugins: [{
                cleanupIDs: false
            }]
        }
    }
};



config.watch = {
    browsersyncOptions: {
        // proxy: 'http://server.dev',

        server: {
            baseDir: config.dirs.out
        }
    },

    watchFiles: [
        {
            files: config.css.in,
            task: 'css'
        },

        {
            files: config.scripts.in,
            task: 'js'
        },

        {
            files: config.html.in,
            task: 'html'
        },
    ]
};


module.exports = config;

