const browserSync = require('browser-sync').create('awm-framework');
const glp         = require('gulp-load-plugins');
const gulp        = require('gulp');
const path        = require('path');

const plugins     = glp();

let config = require(path.join('..', 'config/gulp.config')).watch;

module.exports = function () {
    browserSync.init(config.browsersyncOptions);

    if (config.watchFiles.length) {
        config.watchFiles.forEach((item) => {
            gulp.watch(item.files, gulp.series(item.task));
        });
    }
};
