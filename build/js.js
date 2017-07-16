/* ==========================================================================
   #Compile JS
   ========================================================================== */

/**
 * Compiles JS partials files down into JS that the browser can understand.
 *
 * Requirements:
 *     - webpack
 *     - webpack-stream
 *     - browsersync [https://www.browsersync.io/]
 *     - del [https://www.npmjs.com/package/del]
 */

const argv        = require('yargs').argv;
const browserSync = require('browser-sync');
const glp         = require('gulp-load-plugins');
const gulp        = require('gulp');
const path        = require('path');
const webpack     = require('webpack');
const webpackStream = require('webpack-stream');

const plugins     = glp();
const gutil       = plugins.util;

const del         = require('./clean');

let config = require(path.join('..', 'config/gulp.config')).js;
let webpackConfig = require(path.join('..', 'config/webpack.config'));

function build () {
    function compile () {
        let stream = gulp.src(config.in)
            .pipe(webpackStream(webpackConfig, webpack))
            .on('error', function (error) {
                this.emit('end');
            })
            .pipe(gulp.dest(config.out));

        if (browserSync.has('awm-framework')) {
            browserSync.get('awm-framework').reload();
        }

        return stream;
    }

    return (config.clean || argv.clean) ? clean().then(compile) : compile();
}

function clean () {
    return del([
        path.resolve(`${config.out}`)
    ]);
}

function minify () {
    gutil.log(gutil.colors.magenta(`Minifying JS in ${config.out}`));

    return gulp.src([
        `${config.out}/**/*.js`,
        `!${config.out}/**/*${config.minSuffix}.js`
    ])
        .pipe(plugins.uglify(config.uglifyOptions))
        .pipe(plugins.rename({
            suffix: config.minSuffix
        }))
        .pipe(gulp.dest(config.out));
}

module.exports = {

    build,
    clean,
    minify,

};
