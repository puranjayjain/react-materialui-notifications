var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('buildComponents', function () {
  return gulp.src('src/app/ReactMaterialUiNotifications.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'))
    .pipe(rename({
  		suffix: '.min'
  	}))
  	.pipe(uglify())
  	.pipe(gulp.dest('lib'));
});
