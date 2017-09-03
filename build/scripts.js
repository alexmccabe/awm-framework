/* ==========================================================================
   #Compile JS
   ========================================================================== */

/**
 * Compiles JS partials files down into JS that the browser can understand.
 */

const argv        = require('yargs').argv;
const browserSync = require('browser-sync');
const glp         = require('gulp-load-plugins');
const gulp        = require('gulp');
const map         = require('vinyl-map2');
const path        = require('path');
const transfob    = require('transfob');
const webpack     = require('webpack');
const webpackStream = require('webpack-stream');
const plugins     = glp();

const del         = require('./clean');

let config = require(path.join('..', 'config/gulp.config'));

function errorHandler() {
    return plugins.plumber({
        handleError: function (err) {
            console.log(err);
            this.emit('end');
        }
    });
}

function minify() {
    if (config.isProduction) {
        return plugins.uglify(config.js.uglifyOptions);
    }

    return map(function () {});
}

function initSrcMaps() {
    return plugins.sourcemaps.init({ loadMaps: true });
}

function filterSrcMaps() {
    return transfob(function (file, enc, next) {
        if (!/\.map$/.test(file.path)) {
            this.push(file);
        }

        next();
    });
}

function writeSrcMaps() {
    return plugins.sourcemaps.write('.');
}

function compile () {
    let stream = gulp.src(config.js.in)
        .pipe(errorHandler())
        .pipe(initSrcMaps())
        .pipe(webpackStream(config.js.webpack, webpack))
        .pipe(filterSrcMaps())
        .pipe(minify())
        .pipe(writeSrcMaps())
        .pipe(gulp.dest(config.js.out));

    if (browserSync.has('awm-framework')) {
        browserSync.get('awm-framework').reload();
    }

    return stream;
}

function build () {
    return (config.clean || argv.clean) ? clean().then(compile) : compile();
}

function clean () {
    return del([
        path.resolve(`${config.js.out}`)
    ]);
}

module.exports = {

    build,
    clean,

};
