/**
 * Gulpfile
 * Author: Alex McCabe
 * Company: Kerve
 * Description: This gulpfile is used to run tasks pertaining to
 *              the [PROJECT NAME] project.
 * Resources: https://gist.github.com/webdesserts/5632955
 */

const gulp        = require('gulp');
const path        = require('path');
const named       = require('vinyl-named');

const browserSync = require('browser-sync').create();
const glp         = require('gulp-load-plugins');
const plugins     = glp();

let env = process.env.NODE_ENV || 'development';

/**
 * Gulp task configuration
 * @type {Object}
 */
let config = require('./config/gulp.config');

let tasks = require('./build/tasks');

/**
 * Watch task
 */
gulp.task('watch', tasks.watch);

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
gulp.task('js', tasks.js.build);
gulp.task('clean:js', tasks.js.clean);
gulp.task('minify:js',
    gulp.series('clean:js', 'js', tasks.js.minify)
);


/**
 * Build tasks
 */
gulp.task('build:dev', gulp.series('css', 'js'));
gulp.task('build:prod', gulp.series('minify:css', 'minify:js'));


/**
 * Default task
 */
gulp.task('default', );

return;

/**
 * Gulp tasks
 * @type {Object}
 */
// var tasks = {
//     /**
//      * Default task required by Gulp.
//      * Is run when entering [gulp] on the command line.
//      *
//      * - Starts the Node server
//      * @return {void}
//      */
//     default: function () {
//         'use strict';

//         // gulp.start(tasks.server);
//     },

//     fonts: function () {
//         'use strict';

//         return gulp.src(config.dirs.input + '/fonts/**/*.{ttf,woff,woff2,eot,svg}')
//             .pipe(gulp.dest(config.dirs.assetsDest + '/fonts'));
//     },

//     html: function () {
//         'use strict';

//         return gulp.src(config.dirs.input + '/html/**/*.html')
//             .pipe(gulp.dest(config.dirs.dest));
//     },

//     images: function () {
//         'use strict';

//         return gulp.src([
//             config.dirs.img.input + '**/*.{png,jpg,jpeg,gif,svg}',
//         ])
//             .pipe(plugins.imagemin([
//                 plugins.imagemin.svgo({
//                     plugins: [{
//                         cleanupIDs: false
//                     }]
//                 })]))
//             .pipe(gulp.dest(config.dirs.assetsDest + '/images'));
//     },

//     scss: function () {
//         'use strict';

//         return plugins.rubySass(
//             config.dirs.input + '/scss/**/*.scss',
//             config.scss
//         )
//             .on('error', plugins.rubySass.logError)
//             .pipe(plugins.autoprefixer())
//             .pipe(plugins.sourcemaps.write('./'))
//             .pipe(gulp.dest(config.dirs.assetsDest + '/css'))
//             .pipe(browserSync.stream());
//     },

//     jsLibs: function () {
//         'use strict';

//         return gulp.src(config.dirs.js.input + 'libs/**/*.js')
//             .pipe(gulp.dest(config.dirs.js.output + '/libs'));
//     },

//     js: function () {
//         'use strict';

        // return gulp.src(config.dirs.input + '/js/pages/**/*.js')
        //     .pipe(webpackStream(webpackConfig, webpack))
        //     .on('error', function (error) {
        //         this.emit('end');
        //     })
        //     .pipe(gulp.dest(config.dirs.assetsDest + '/js'));
//     },

//     bsWatch: function (done) {
//         'use strict';

//         browserSync.reload();
//         done();
//     },

    // bs: function () {
    //     'use strict';

    //     browserSync.init({
    //         proxy: 'http://framework.dev/'
    //         server: {
    //             baseDir: './public'
    //         }
    //     });

    //     gulp.watch(config.watchFiles.js, ['js-watch']);
    //     gulp.watch(config.watchFiles.scss, ['scss']);
    //     gulp.watch(config.watchFiles.html, ['html-watch']);
    //     gulp.watch(config.watchFiles.fonts, ['fonts-watch']);
    //     gulp.watch(config.watchFiles.wordpress, ['html-watch']);
    //     // gulp.watch('src/img/**/*', ['img-watch']);
    // },

//     production: function () {
//         'use strict';

//         gulp.start('compress:js');
//         gulp.start('compress:css');
//     },

//     minifyJS: function () {
//         'use strict';

//         return gulp.src([`${config.dirs.js.output}/**/*.js`, `!${config.dirs.js.output}/**/*.min.js`])
//             .pipe(plugins.jsmin())
//             .pipe(plugins.rename({
//                 suffix: '.min'
//             }))
//             .pipe(gulp.dest(config.dirs.js.output));
//     },

//     minifyCSS: function () {
//         'use strict';

//         return gulp.src([`${config.dirs.css.output}/**/*.css`, `!${config.dirs.css.output}/**/*.min.css`])
//             .pipe(plugins.cleanCss())
//             .pipe(plugins.rename({
//                 suffix: '.min'
//             }))
//             .pipe(gulp.dest(config.dirs.css.output));
//     },

//     compressCSS: function () {
//         'use strict';

//         return gulp.src('./public/assets/css/**/*.min.css')
//             .pipe(plugins.zopfli())
//             .pipe(plugins.rename({
//                 extname: '.gz'
//             }))
//             .pipe(gulp.dest('public/assets/css'));
//     },

//     compressJS: function () {
//         'use strict';

//         return gulp.src('./public/assets/js/**/*.min.js')
//             .pipe(plugins.zopfli())
//             .pipe(plugins.rename({
//                 extname: '.gz'
//             }))
//             .pipe(gulp.dest('public/assets/js'));
//     },

//     cleanImg: function () {
//         'use strict';

//         return del([
//             './public/assets/img/**/*'
//         ]);
//     }
// };


// /**
//  * Gulp task definitions
//  */
// gulp.task('js', [], tasks.js);
// gulp.task('js:libs', [], tasks.jsLibs);
// gulp.task('js-watch', ['js', 'js:libs'], tasks.bsWatch);
// gulp.task('html-watch', ['html'], tasks.bsWatch);
// gulp.task('fonts-watch', ['fonts'], tasks.bsWatch);
// gulp.task('img-watch', ['images'], tasks.bsWatch);
// gulp.task('browser-sync', [], tasks.bs);
// gulp.task('scss', [], tasks.scss);
// gulp.task('html', [], tasks.html);
// gulp.task('fonts', [], tasks.fonts);
// gulp.task('images', ['clean:images'], tasks.images);

// gulp.task('clean:images', [], tasks.cleanImg);

// gulp.task('minify:css', [], tasks.minifyCSS);
// gulp.task('minify:js', [], tasks.minifyJS);
// gulp.task('compress:css', [], tasks.compressCSS);
// gulp.task('compress:js', [], tasks.compressJS);
// gulp.task('production', ['minfiy:js', 'minify:css'], tasks.production);

// gulp.task(
//     'default',
//     [
//         'js',
//         // 'js:libs',
//         'scss',
//         'html',
//         'fonts',
//         // 'images',
//         'browser-sync'
//     ],
//     tasks.default
// );
