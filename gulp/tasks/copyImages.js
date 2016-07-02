// copy relevant images to the destination folder
var gulp = require('gulp');

gulp.task('copyImages', function() {
  return gulp.src('assets/**/*.png')
    .pipe(gulp.dest('build'));
});
