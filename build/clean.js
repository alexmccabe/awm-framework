const del     = require('del');
const glp     = require('gulp-load-plugins');
const plugins = glp();
const gutil   = plugins.util;

/**
 * Remove a specified directory
 * @param  {string} directory
 * @return {function}
 */
function cleanDirectory(directory) {
    if (!Array.isArray(directory)) {
        directory = [directory];
    }

    gutil.log(gutil.colors.magenta(`Cleaning ${directory}`));

    return del(directory);
}

module.exports = cleanDirectory;