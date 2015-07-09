// Gulp tools
var gulp = require('gulp');
var u = require('gulp-util');
var log = u.log;
var c = u.colors;

// Project deps
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

// -----------------------------------------------------------------------------
// Sass Task
//
// Compiles Sass and runs the CSS through autoprefixer.
// -----------------------------------------------------------------------------
gulp.task('sass', function() {
  return gulp.src('sass/**/*')
    .pipe(sass({
        outputStyle: 'nested',
      })
      .on('error', function(err, res) {
        gutil.log(c.red('sass'), 'failed to compile');
        gutil.log(c.red('> ') + err.message);
      })
    )
    .pipe(prefix('last 2 versions', '> 1%'))
    .pipe(gulp.dest('public/css'));
});

// -----------------------------------------------------------------------------
// Watch tasks
// -----------------------------------------------------------------------------
gulp.task('watch', function() {
  gulp.watch('sass/**/*', ['sass']);
});

// -----------------------------------------------------------------------------
// Run the dev server
// -----------------------------------------------------------------------------
gulp.task('start', ['sass', 'watch'], function () {
  nodemon({
    script: 'index.js',
    ext: 'js html dust',
    env: { 'NODE_ENV': 'development' }
  });
});

// -----------------------------------------------------------------------------
// Default should just start the server
// -----------------------------------------------------------------------------
gulp.task('default', ['start']);
