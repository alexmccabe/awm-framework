/*jslint*/
/*global process*/

let env = process.env.NODE_ENV || 'development';

let config = {
    dirs: {
        build: 'dist',
        input: 'src',
        output: 'public',
        assets: '/assets',
    },

    scss: {
        lineNumbers: (env === 'development' ? true : false),
        sourcemap: (env === 'development' ? true : false),
        style: (env === 'development' ? 'expanded' : 'compressed')
    }
};


config.dirs.dest = (
    env === 'development' ? config.dirs.output : config.dirs.build
);

config.dirs.assetsDest = config.dirs.dest + config.dirs.assets;

config.watchFiles = {
    fonts: `${config.dirs.input}/fonts**/*.{ttf,woff,eof,svg}`,
    html: `${config.dirs.input}/**/*.html`,
    js: [
        `${config.dirs.input}/js/**/*.js`,
        `${config.dirs.input}/templates/**/*.vue`,
    ],
    scss: `${config.dirs.input}/scss/**/*.scss`,
};

module.exports = config;
