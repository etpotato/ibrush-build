const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const sourcemap = require('gulp-sourcemaps');
const sync = require('browser-sync').create();
const twig = require('gulp-twig');
const htmlmin = require('gulp-htmlmin');

/* clear */
const clear = () => {
  return del('./build/');
};

/* twig */
const html = () => {
  return gulp.src('./src/*.twig')
    .pipe(twig())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./build/'))
    .pipe(sync.stream());
};

/* default */
exports.default = gulp.series(
  clear,
  html,
);
