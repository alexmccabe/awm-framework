const browserSync = require('browser-sync').create('awm-framework');
const gulp        = require('gulp');
const path        = require('path');

let config = require(path.join('..', 'config/gulp.config')).watch;

module.exports = {
    watch () {
        browserSync.init(config.browsersyncOptions);

        if (config.watchFiles.length) {
            config.watchFiles.forEach((item) => {
                gulp.watch(item.files, gulp.series(item.task));
            });
        }
    },

    reload () {
        browserSync.reload();
    }
};
