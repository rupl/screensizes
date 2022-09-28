// Gulp tools
var gulp = require('gulp');
var u = require('gulp-util');
var log = u.log;
var c = u.colors;

// Project deps
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass')(require('sass'));
var prefix = require('gulp-autoprefixer');

// Log some debug info
log(c.yellow('Environment:', (process.env.NODE_ENV || 'local')));
log(c.yellow('Visualize Self:', (process.env.VISUALIZE_SELF || 'false')));


//——————————————————————————————————————————————————————————————————————————————
// Sass Task
//
// Compiles Sass and runs the CSS through autoprefixer.
//——————————————————————————————————————————————————————————————————————————————
function sassTask() {
  return gulp.src('sass/**/*')
    .pipe(sass()
      .on('error', function(err, res) {
        log(c.red('sass'), 'failed to compile');
        log(c.red('> ') + err.message);
      })
    )
    .pipe(prefix('last 2 versions', '> 1%'))
    .pipe(gulp.dest('public/css'));
};
sassTask.description = 'Compiles Sass';
module.exports.sass = sassTask;


//——————————————————————————————————————————————————————————————————————————————
// Watch tasks
//——————————————————————————————————————————————————————————————————————————————
function watchTask() {
  gulp.watch('sass/**/*', sassTask);
};
watchTask.description = 'For local development';
module.exports.watch = watchTask;


//——————————————————————————————————————————————————————————————————————————————
// Run the dev server
//——————————————————————————————————————————————————————————————————————————————
gulp.task('start', gulp.series(sassTask, 'watch'), () => {
  nodemon({
    script: 'index.js',
    ext: 'js html dust',
    env: { 'NODE_ENV': 'development' }
  });
});


//——————————————————————————————————————————————————————————————————————————————
// Default should just start the server
//——————————————————————————————————————————————————————————————————————————————
gulp.task('default', gulp.parallel('start'));
