'use strict';

require('gulp-watch');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const path = require('path');
const rename = require('gulp-rename');
const header = require('gulp-header');
const pkg = require('./package.json');

const paths = {
  js: {
    src: 'gulp/js/src',
    dev: 'gulp/js/dev'
  }
};

const banner = ['/**',
  ' * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>',
  ' * @author <%= pkg.author %>',
  ' * @link <%= pkg.homepage %>',
  ' */',
  ''].join('\n');

gulp.task('compress', () => {
  return gulp.src(path.join(paths.js.src, '*.js'))
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.join(paths.js.dev)));
});

gulp.task('watch', () => {
  let ops = {
    ignoreInitial: false
  };
  gulp.watch(path.join(paths.js.src, '**/*.js'),
  ops,
  ['compress']
  );
});
