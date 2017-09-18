/* ==========================================================================
   #Compile JS
   ========================================================================== */

/**
 * Compiles JS partials files down into JS that the browser can understand.
 */

const argv        = require('yargs').argv;
const gulp        = require('gulp');
const webpack     = require('webpack');
const webpackStream = require('webpack-stream');

const Task = require('./Task');

class Scripts extends Task {
    constructor() {
        super();

        this.task = 'scripts';
        this.files = this.config[this.task].in;
    }

    webpack() {
        return webpackStream(this.config[this.task].webpack, webpack);
    }

    compile() {
        return gulp
            .src(this.files)
            .pipe(this.onError())
            .pipe(this.clean())
            .pipe(this.webpack())
            .pipe(this.initSrcMaps())
            .pipe(this.filterSrcMaps())
            .pipe(this.writeSrcMaps())
            // .pipe(this.minify())
            // .pipe(this.revision())
            .pipe(this.write())
            // .pipe(this.createManifest())
            .pipe(this.onSuccess(true));
    }
}


module.exports = function () {
    let scripts = new Scripts;

    return scripts.compile();
};
