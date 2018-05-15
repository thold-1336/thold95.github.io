"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    htmlreplace = require('gulp-html-replace'),
    cssmin = require('gulp-cssmin');

gulp.task("concatScripts", function() {
    return gulp.src('assets/js/*.js')
        .pipe(maps.init())
        .pipe(concat('main.js'))
        .pipe(maps.write('./js'))
        .pipe(gulp.dest(''))
        .pipe(browserSync.stream());
});

gulp.task("minifyScripts", ["concatScripts"], function() {
    return gulp.src("assets/js/main.js")
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
    return gulp.src("scss/main.scss")
        .pipe(maps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload);
});

gulp.task("minifyCss", ["compileSass"], function() {
    return gulp.src("css/main.css")
        .pipe(cssmin())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('watchFiles', function() {
    gulp.watch('scss/**/*.scss', ['compileSass']);
    gulp.watch('assets/js/*.js', ['concatScripts']);
})

gulp.task('clean', function() {
    del(['dist', 'css/main.css*', 'js/main*.js*']);
});

gulp.task('renameSources', function() {
    return gulp.src(['*.html', '*.php'])
        .pipe(htmlreplace({
            'js': 'js/main.min.js',
            'css': 'css/main.min.css'
        }))
        .pipe(gulp.dest('/.'));
});

gulp.task("build", ['minifyScripts', 'minifyCss'], function() {
    return gulp.src([
            '*.html',
            '*.php',
            'favicon.ico',
            "images/**"
        ], { base: './' })
        .pipe(gulp.dest('/.'));
});

gulp.task('serve', ['watchFiles'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/**/*.scss", ['watchFiles']);
    gulp.watch(['*.html', '*.css', '*.scss','*.php']).on('change', browserSync.reload);
});

gulp.task("default", ["clean", 'build'], function() {
    gulp.start('renameSources');
});