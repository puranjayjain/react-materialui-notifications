// make a release build
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('release', ['browserify', 'copyImages', 'markup', 'buildComponents'], function(done) {
	runSequence('minifyApp', function() {
		done();
	});
});
