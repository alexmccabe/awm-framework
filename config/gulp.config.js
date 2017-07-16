/* ==========================================================================
   #Gulp Configuration
   ========================================================================== */

/**
 * 1. The reason we always say expanded with sourcemaps, is because the minify
 *    process removes all comments and whitespace.
 */
let config = {};

config.dirs = {
    baseDir: 'src',
    baseOutDir: './public'
};


config.css = {
    in: `${config.dirs.baseDir}/scss/**/*.{css,scss}`,
    out: `${config.dirs.baseOutDir}/assets/css`,
    clean: false,

    rubySassOptions: { /* [1] */
        lineNumbers: true,
        sourcemap: true,
        style: 'expanded'
    },

    minSuffix: '.min',
};

config.js = {
    in: [
        `${config.dirs.baseDir}/js/**/*.{js,jsx}`,
        `${config.dirs.baseDir}/components/**/*.{handlebars}`,
    ],
    out: `${config.dirs.baseOutDir}/assets/js`,
    clean: false,

    uglifyOptions: {},

    minSuffix: '.min',
};

config.fonts = {
    in: `${config.dirs.baseDir}/fonts/**/*.{ttf,woff,woff2,eot,svg}`,
    out: `${config.dirs.baseOutDir}/assets/fonts`,
    clean: true,
};

config.html = {
    in: `${config.dirs.baseDir}/html/**/*.html`,
    out: `${config.dirs.baseOutDir}`,
    clean: true,
};

config.images = {
    in: `${config.dirs.baseDir}/images/**/*.{png,jpg,jpeg,gif,svg}`,
    out: `${config.dirs.baseOutDir}/assets/images`,
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
            baseDir: config.dirs.baseOutDir
        }
    },

    watchFiles: [
        {
            files: config.css.in,
            task: 'css'
        },

        {
            files: config.js.in,
            task: 'js'
        },

        {
            files: config.html.in,
            task: 'html'
        },
    ]
};


module.exports = config;

