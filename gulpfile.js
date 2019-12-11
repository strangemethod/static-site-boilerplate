var gulp = require('gulp');
var requireDir = require('require-dir');

/*
 * Require directory containing gulp tasks
 */
requireDir('./gulp');

gulp.task('default', ['handlebars', 'components', 'sass', 'scripts', 'connect', 'watch'], function() {});