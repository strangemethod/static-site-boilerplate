var gulp = require('gulp');
var data = require('gulp-data');
var hb = require('gulp-hb');
var rename = require('gulp-rename');
var layouts = require('handlebars-layouts');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var path = require('path');
var CONFIG_ = require('../config');

/*
 * Compile handlebars templates
 */

gulp.task('handlebars', function () {
  var hbStream = hb()
    .partials(path.join(CONFIG_.paths.partials, '*.hbs'))
    .partials(path.join(CONFIG_.paths.components, '**/*.hbs'))
    .data(path.join(CONFIG_.paths.data, '*.json'))
    .helpers(layouts);

    return gulp
      .src(path.join(CONFIG_.paths.templates, '*.hbs'))
      .pipe(hbStream)
      .pipe(rename({
        extname: ""
       }))
      .pipe(rename({
        extname: ".html"
       }))
      .pipe(gulp.dest('./public'))
      .pipe(livereload(server));
});