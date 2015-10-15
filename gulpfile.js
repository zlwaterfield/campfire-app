var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var reactify = require('reactify');
var less = require('gulp-less');

gulp.task('browserify', function() {
  gulp.src('src/js/main.js')
    .pipe(browserify({transform:'reactify'}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-images', function() {
  gulp.src('src/images/**/*.*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('less', function () {
  gulp.src('src/style/*.less')
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/style'));
});

gulp.task('default',['browserify', 'less', 'copy', 'copy-images'], function() {
  return gulp.watch('src/**/*.*', ['default', 'less', 'copy']);
});
