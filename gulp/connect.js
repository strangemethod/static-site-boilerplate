var gulp = require('gulp');
var connect = require('gulp-connect');
var CONFIG_ = require('../config');


/*
 * Connect the local server.
 */

gulp.task('connect', function() {
  connect.server({
    port: 1337,
    root: ['public'],
    livereload: true
  });
});