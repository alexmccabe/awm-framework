const del     = require('del');
const glp     = require('gulp-load-plugins');
const plugins = glp();
const gutil   = plugins.util;

module.exports = function (directory) {
    if (!Array.isArray(directory)) {
        directory = [directory];
    }

    gutil.log(gutil.colors.magenta(`Cleaning ${directory}`));

    return del(directory);
};