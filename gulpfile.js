var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	data = require('gulp-data'),
	hb = require('gulp-hb'),
	rename = require('gulp-rename'),
	// notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	lr = require('tiny-lr'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	server = lr(),
	merge = require('merge-stream'),
	path = require('path');


var paths = {
	templates: './src/templates/',
	partials: './src/partials/',
	components: './src/components/',
	sass: './src/sass/',
	scripts: './src/js/',
	data: './src/data/'
};


gulp.task('handlebars', function () {
    var hbStream = hb()
        .partials(path.join(paths.partials, '*.hbs'))
        .partials(path.join(paths.components, '**/*.hbs'))
        .data(path.join(paths.data, '*.json'));

    return gulp
        .src(path.join(paths.templates, '*.hbs'))
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

gulp.task('components', function() {
	var compileSass = gulp.src(path.join(paths.components, '**/*.scss'))
		.pipe(sass({ style: 'expanded', sourceComments: 'map', errLogToConsole: true}))
		.pipe(autoprefixer('last 2 version', "> 1%", 'ie 8', 'ie 9'))
		.pipe(concat('components.css'))
		.pipe(gulp.dest('./public/css'))
		.pipe(livereload(server));

	var compileJs = gulp.src(path.join(paths.components, '**/*.js'))
	    .pipe(concat('components.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('./public/js'))
		.pipe(livereload(server));

	return merge(compileSass, compileJs);
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
  return gulp.src(path.join(paths.scripts, '*.js'))
    .pipe(concat('main.js'))
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

		gulp.watch(path.join(paths.partials, '**/*.hbs'), ['handlebars']);
		gulp.watch(path.join(paths.templates, '**/*.hbs'), ['handlebars']);
		gulp.watch(path.join(paths.components, '**/*.hbs'), ['handlebars']);
		gulp.watch(path.join(paths.components, '**/*.{scss,js}'), ['components']);
		gulp.watch(path.join(paths.sass, '**/*.scss'), ['sass']);
		gulp.watch(path.join(paths.scripts, '**/*.js'), ['scripts']);

	});

});


gulp.task('default', ['handlebars', 'components', 'sass', 'scripts', 'connect', 'watch'], function() {

});