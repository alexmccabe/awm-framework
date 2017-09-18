/**
 * Node module imports
 */
const argv        = require('yargs').argv;
const browserSync = require('browser-sync');
const gulp        = require('gulp');
const glp         = require('gulp-load-plugins');
const map         = require('vinyl-map2');
const path        = require('path');
const through        = require('through2');
const transfob    = require('transfob');

const del         = require('del');


/**
 * Variables
 */
let config  = require(path.join('..', 'config/gulp.config'));
let plugins = glp();


class Task {
    constructor() {
        this.config = require(path.join('..', 'config/gulp.config'));
        this.task = '';
    }

    clean(dirs = []) {
        let doClean = this.config[this.task].clean || argv.clean;

        dirs = (dirs.length) ? dirs : this.config[this.task].out;

        if (doClean) {
            del(dirs)
                .then(() => {
                    return this.createStream();
                });
        }

        return this.createStream();
    }

    createStream(callback = function () {}) {
        return map(callback);
    }

    minify() {
        if (config.isProduction) {
            switch (this.task) {
            case 'scripts':
                return plugins.uglify(this.config[this.task].uglifyOptions);
            }
        }

        return this.createStream();
    }

    onError() {
        return plugins.plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        });
    }

    onSuccess(reload = false) {
        if (browserSync.has('awm-framework')) {
            if (reload) {
                browserSync.get('awm-framework').reload();
            }

            browserSync.get('awm-framework').stream();
        }

        return this.createStream();
    }

    initSrcMaps() {
        return plugins.sourcemaps.init({ loadMaps: true });
    }

    filterSrcMaps() {
        return transfob(function (file, enc, next) {
            if (!/\.map$/.test(file.path)) {
                next(null, file);
            } else {
                next();
            }
        });
    }

    writeSrcMaps() {
        return plugins.sourcemaps.write('.');
    }

    write(dir) {
        return gulp.dest(dir || this.config[this.task].out);
    }

    revision() {
        if (this.config.isProduction) {
            return plugins.rev();
        }

        return this.createStream();
    }

    createManifest() {
        let self = this;

        let manifest = plugins.rev.manifest(this.config.manifest);

        // through.obj(function (file) {
        //     console.log(file);
        // })



        // console.log(manifest);

        // return this.createStream(function (file) {
        //     plugins.rev.manifest(self.config.manifest);

        //     self.write();

        //     return file;
        // });
        // // if (this.config.isProduction) {
        // //     return plugins.rev.manifest(this.config.manifest);
        // // }

        // return this.createStream(function (file) {
        //     console.log(file);
        // });
    }
}

module.exports = Task;
