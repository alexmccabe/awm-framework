/* ==========================================================================
   #Compile CSS
   ========================================================================== */

/**
 * Compiles SCSS / SASS files down into CSS that the browser can understand.
 */

const gulp = require('gulp');
const sass = require('gulp-sass');

const Task = require('./Task');

class Scss extends Task {
    constructor() {
        super();

        this.task = 'scss';
        this.files = this.config[this.task].in;
    }

    scss() {
        return sass(this.config[this.task].gulpSassOptions);
    }

    compile() {
        return gulp.src(this.files)
            .pipe(this.onError())
            .pipe(this.initSrcMaps())
            .pipe(this.clean())
            .pipe(this.scss())
            .pipe(this.writeSrcMaps())
            .pipe(this.write())
            .pipe(this.onSuccess());
    }
}

module.exports = () => {
    let scss = new Scss;

    return scss.compile();
};
