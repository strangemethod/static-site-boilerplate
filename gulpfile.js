var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	data = require('gulp-data'),
	handlebars = require('gulp-compile-handlebars'),
	rename = require('gulp-rename'),
	// notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	lr = require('tiny-lr'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	server = lr(),
	path = require('path');


var paths = {
	templates: './src/templates/',
	partials: './src/partials/',
	sass: './src/sass/',
	js: './src/js/',
	data: './src/data/'
};


gulp.task('handlebars', function() {

	var templateData = {},
	options = {
			ignorePartials: true,
			batch : [paths.partials]
	}

	return gulp.src(path.join(paths.templates, '*.handlebars'))
			.pipe(data(function(file) {
				return require(paths.data + 'data.json');
			}))
			.pipe(handlebars(templateData, options))
			.pipe(rename({
				extname: ""
			 }))
			.pipe(rename({
				extname: ".html"
			 }))
			.pipe(gulp.dest('./public'))
			.pipe(livereload(server));
});


gulp.task('sass', function() {
	return gulp.src(path.join(paths.sass, '*.scss'))
		.pipe(sass({ style: 'expanded', sourceComments: 'map', errLogToConsole: true}))
		.pipe(autoprefixer('last 2 version', "> 1%", 'ie 8', 'ie 9'))
		.pipe(gulp.dest('./public/css'))
		.pipe(livereload(server));
		// .pipe(notify({ message: 'SASS compiled!' }));
});


gulp.task('scripts', function() {
  return gulp.src(path.join(paths.js, '*.js'))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
	.pipe(livereload(server));
	// .pipe(notify({ message: 'JS compiled!' }));
});


gulp.task('connect', function() {
	connect.server({
		port: 1337,
		root: ['public'],
		livereload: false
	});
});


gulp.task('watch', function() {

	server.listen(35729, function (err) {
		if (err) {
			return console.error(err) 
		};

		// watch task for gulp-includes
		gulp.watch(path.join(paths.partials, '**/*.handlebars'), ['handlebars']);
		gulp.watch(path.join(paths.templates, '**/*.handlebars'), ['handlebars']);

		//Watch task for sass
		gulp.watch(path.join(paths.sass, '**/*.scss'), ['sass']);

		//Watch task for js
		gulp.watch(path.join(paths.js, '**/*.js'), ['scripts']);

	});

});


gulp.task('default', ['handlebars', 'sass', 'scripts', 'connect', 'watch'], function() {

});