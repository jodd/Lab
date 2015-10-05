/* ==========================================================================
   Gulpfile
   ========================================================================== */

/* Load plugins
   -------------------------------------------------------------------------- */
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
// var webpack = require('gulp-webpack');

/* Folders
   -------------------------------------------------------------------------- */
var src = '.';
var dest = '.';
var bower_dir = './bower_components';

/* Tasks
   -------------------------------------------------------------------------- */
// Styles
gulp.task('styles', function() {
    return gulp.src(src + '/styles/main.styl')
        .pipe(stylus())
        .pipe(postcss([autoprefixer({ browsers: ['last 2 version'] })]))
        .pipe(gulp.dest(src + '/css'));
});

// External lib
gulp.task('lib', function() {
    gulp.src(bower_dir + '/normalize.css/normalize.css')
        .pipe(gulp.dest(src + '/css'));

    return gulp.src([
            bower_dir + '/requirejs/require.js',
            bower_dir + '/modernizr/modernizr.js',
            bower_dir + '/jquery/dist/jquery.js'
        ])
        .pipe(gulp.dest(src + '/js'));
});

// Watch
gulp.task('watch', function() {

    gulp.watch([src + '/styles/*'], ['styles']);

    livereload.listen();
    // When dest changes, tell the browser to reload
    // gulp.watch([dest + '/**/*', '!' + src + '/styles/**/*']).on('change', livereload.changed);
    gulp.watch([dest + '/css/**/*', dest + '/js/*']).on('change', livereload.changed);
});

// Build
gulp.task('build', function() {
    gulp.start('lib', 'styles');
});

gulp.task('default', ['build'], function() {});