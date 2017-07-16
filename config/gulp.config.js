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
    ]
};

module.exports = config;









// let config = {
//     dirs: {
//         build: 'dist',
//         input: 'src',
//         output: 'public',
//         assets: '/assets',
//     },

//     scss: {
//         lineNumbers: (env === 'development' ? true : false),
//         sourcemap: (env === 'development' ? true : false),
//         style: (env === 'development' ? 'expanded' : 'compressed')
//     }
// };


// config.dirs.dest = (
//     env === 'development' ? config.dirs.output : config.dirs.build
// );

// config.dirs.assetsDest = config.dirs.dest + config.dirs.assets;

// config.watchFiles = {
//     fonts: `${config.dirs.input}/fonts**/*.{ttf,woff,eof,svg}`,
//     html: `${config.dirs.input}/**/*.html`,
//     js: [
//         `${config.dirs.input}/js/**/*.js`,
//         `${config.dirs.input}/templates/**/*.vue`,
//     ],
//     scss: `${config.dirs.input}/scss/**/*.scss`,
// };

// module.exports = config;
