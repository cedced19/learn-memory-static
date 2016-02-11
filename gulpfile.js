var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    ghpages = require('gh-pages'),
    htmlmin = require('gulp-htmlmin'),
    path = require('path');

gulp.task('favicon', function () {
    gulp.src('favicon.ico')
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('views', function () {
    return gulp.src('views/**.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/views'));
});

gulp.task('fonts', function () {
    return gulp.src('fonts/**.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('js', function () {
    var bundleStream = browserify('javascripts/index.js').bundle();

    bundleStream
      .pipe(source('javascripts/index.js'))
      .pipe(streamify(uglify()))
      .pipe(rename('scripts.js'))
      .pipe(gulp.dest('dist/javascripts'));
});

gulp.task('css', function () {
    return gulp.src('stylesheets/styles.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9']
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('default', ['css', 'html', 'js', 'fonts', 'favicon', 'views']);

gulp.task('deploy', ['default'], function(done) {
  ghpages.publish(path.join(__dirname, 'dist'), { logger: gutil.log }, done);
});
