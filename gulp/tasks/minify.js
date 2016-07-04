var gulp = require('gulp');
var config = require('../config').browserify.bundleConfigs;
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require("gulp-rename");

gulp.task('minifyApp', function(cb) {
  pump([
    gulp.src('build/app.js'),
    uglify(),
    rename(function (path) {
      path.extname = ".min.js"
    }),
    gulp.dest('build')
  ],
  cb
);
});
