/**
 * It's just nodemon config now.
 */
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

//——————————————————————————————————————————————————————————————————————————————
// Run the dev server
//——————————————————————————————————————————————————————————————————————————————
gulp.task('start', () => {
  nodemon({
    script: 'index.js',
    ext: 'css js html dust',
    env: { 'NODE_ENV': 'development' }
  });
});


//——————————————————————————————————————————————————————————————————————————————
// Default should just start the server
//——————————————————————————————————————————————————————————————————————————————
gulp.task('default', gulp.parallel('start'));
