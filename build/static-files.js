const argv        = require('yargs').argv;
const browserSync = require('browser-sync');
const glp         = require('gulp-load-plugins');
const gulp        = require('gulp');
const path        = require('path');

const plugins     = glp();
const del         = require('./clean');

let config = require(path.join('..', 'config/gulp.config'));

function clean (dir) {
    return del([
        path.resolve(dir)
    ]);
}

module.exports = {
    fonts () {

        function compile () {
            return gulp.src(config.fonts.in)
                .pipe(gulp.dest(config.fonts.out));
        }

        return (config.clean || argv.clean) ?
            clean(config.fonts.out).then(compile) :
            compile();

    },


    html () {

        function compile () {
            let stream = gulp.src(config.html.in);

            stream.pipe(gulp.dest(config.html.out));

            if (browserSync.has('awm-framework')) {
                browserSync.get('awm-framework').reload();
            }

            return stream;
        }

        return (config.clean || argv.clean) ?
            clean(`${config.html.out}/**/*.html`).then(compile) :
            compile();

    },

    images () {

        function compile () {
            return gulp.src(config.images.in)
                .pipe(plugins.imagemin([
                    plugins.imagemin.svgo(config.images.imageMinOptions.svgo)
                ]))
                .pipe(gulp.dest(config.images.out));
        }

        return (config.clean || argv.clean) ?
            clean(config.images.out).then(compile) :
            compile();
    }
};
