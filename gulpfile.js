var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var _ = require('lodash');

function webpackConf(target) {
	return {
		context : __dirname,
		output : {
			path : __dirname + "/public/js",
			filename : target
		}
	};
}

gulp.task('default', ['dev']);

gulp.task('dev', ['webpack'], function() {
	livereload.listen();

	nodemon({script : 'src/server.js', ext : 'html js', watch : ['src/server.js'], ignore : ['public/js/*.js']})
//		.on('change', ['webpack'])
//		.on('restart', function() {
//			    console.log('restarted!')
//			    livereload();
//		    })

	gulp.watch(['src/**', '!src/server.js', 'test/**'], ['webpack']);

	gulp.watch('public/**').on('change', function(changed) {
		setTimeout(function() {
			livereload.changed(changed);
		}, 250)
	});
});

gulp.task("webpack", ['webpack_test', 'webpack_src']);

gulp.task("webpack_src", function() {
	return gulp.src('src/client.js')
		.pipe(webpack(webpackConf('client.js')))
		.pipe(gulp.dest('public/js'));
});

gulp.task("webpack_test", function() {
	return gulp.src('test/tests.js')
		.pipe(webpack(webpackConf('tests.js')))
		.pipe(gulp.dest('public/js'));
});

gulp.task("minify", function() {
	return gulp.src('public/js/client.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/js/'));
});
 