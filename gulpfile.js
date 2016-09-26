var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    fileinclude = require('gulp-file-include'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    server = lr(),
    path = require("path");

var paths = {
  templates: './templates',
  sass: './sass',
  assets: './assets'
};


gulp.task('fileinclude', function() {
  return  gulp.src(path.join(paths.templates, '*.tpl.html'))
    .pipe(fileinclude())
    .pipe(rename({
      extname: ""
     }))
    .pipe(rename({
      extname: ".html"
     }))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Includes: included' }));
});


gulp.task('sass', function() {
  return gulp.src(path.join(paths.sass, '*.scss'))
    .pipe(sass({ style: 'expanded', sourceComments: 'map', errLogToConsole: true}))
    .pipe(autoprefixer('last 2 version', "> 1%", 'ie 8', 'ie 9'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'SASS compiled!' }));
});

gulp.task('static-assets', function() {
  gulp.src(path.join(paths.assets, '*'))
    .pipe(gulp.dest('./dist/assets'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Static Assets copied' }));
  gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Normalize copied' }));
});

gulp.task('connect', function() {
  connect.server({
    port: 1337,
    root: ['dist'],
    livereload: false
  });
});

function watchStuff(task) {
  // Listen on port 35729
  server.listen(35729, function (err) {
    if (err) {
      return console.error(err) 
      //TODO use notify to log a message on Sass compile fail and Beep
    };

    //Watch task for sass
    gulp.watch(path.join(paths.sass, '**/*.scss'), [task]);

    // watch task for gulp-includes
    gulp.watch(path.join(paths.templates, '**/*.html'), ['fileinclude']);

  });
}


gulp.task('watch', function() {
 watchStuff('sass');
});


gulp.task('default', ['fileinclude', 'sass', 'static-assets', 'connect', 'watch'], function() {

});