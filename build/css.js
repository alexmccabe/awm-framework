/* ==========================================================================
   #Compile CSS
   ========================================================================== */

/**
 * Compiles SCSS / SASS files down into CSS that the browser can understand.
 *
 * Requirements:
 *     - gulp-ruby-sass [https://github.com/sindresorhus/gulp-ruby-sass]
 *         - sass [http://sass-lang.com/install]
 *     - gulp-autoprefixer [https://www.npmjs.com/package/gulp-autoprefixer]
 *     - gulp-sourcemaps [https://www.npmjs.com/package/gulp-sourcemaps]
 *     - browsersync [https://www.browsersync.io/]
 *     - del [https://www.npmjs.com/package/del]
 */

const argv        = require('yargs').argv;
const browserSync = require('browser-sync');
const glp         = require('gulp-load-plugins');
const gulp        = require('gulp');
const path        = require('path');

const plugins     = glp();
const gutil       = plugins.util;

const del         = require('./clean');

let config = require(path.join('..', 'config/gulp.config')).css;

function build () {
    function compile () {
        let stream = plugins.rubySass(config.in, config.rubySassOptions)
            .on('error', plugins.rubySass.logError)
            .pipe(plugins.autoprefixer())
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(config.out));

        if (browserSync.has('awm-framework')) {
            stream.pipe(browserSync.get('awm-framework').stream());
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
    gutil.log(gutil.colors.magenta(`Minifying CSS in ${config.out}`));

    return gulp.src([
        `${config.out}/**/*.css`,
        `!${config.out}/**/*${config.minSuffix}.css`
    ])
        .pipe(plugins.cleanCss())
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
