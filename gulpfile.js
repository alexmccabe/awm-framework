/**
 * Gulpfile
 * Author: Alex McCabe
 * Company: Kerve
 * Description: This gulpfile is used to run tasks pertaining to
 *              the [PROJECT NAME] project.
 * Resources: https://gist.github.com/webdesserts/5632955
 */

const gulp = require('gulp');

let tasks = require('./build/tasks');

/**
 * Watch task
 */
gulp.task('watch', tasks.watch.watch);
gulp.task('reload', tasks.watch.reload);

/**
 * CSS tasks
 */
gulp.task('css', tasks.css.build);
gulp.task('clean:css', tasks.css.clean);
gulp.task('minify:css',
    gulp.series('clean:css', 'css', tasks.css.minify)
);

/**
 * CSS tasks
 */
gulp.task('js', tasks.scripts);
// gulp.task('clean:js', tasks.js.clean);
// gulp.task('minify:js',
//     gulp.series('clean:js', 'js', tasks.js.minify)
// );

/**
 * Static file tasks
 */

gulp.task('fonts', tasks.fonts);
gulp.task('html', tasks.html);
gulp.task('images', tasks.images);
gulp.task('static', gulp.series('fonts', 'html', 'images'));

/**
 * Build tasks
 */
gulp.task('build:dev', gulp.series('static', 'css', 'js'));
gulp.task('build:production', gulp.series('js', 'minify:css', 'static'));

/**
 * Default task
 */
gulp.task('default', gulp.series('build:dev', 'watch'));
