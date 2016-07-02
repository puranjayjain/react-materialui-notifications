// make a release build

var gulp = require('gulp');

gulp.task('release', ['browserify', 'copyImages', 'markup', 'minify', 'minifyApp']);
