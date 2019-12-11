var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var path = require('path');
var babel = require('gulp-babel');
var CONFIG_ = require('../config');


/*
 * Compile scripts.
 */

gulp.task('scripts', function() {
  return gulp.src(path.join(CONFIG_.paths.scripts, '*.js'))
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
  .pipe(livereload(server));
});