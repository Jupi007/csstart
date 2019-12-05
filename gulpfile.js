var gulp = require('gulp');
var p = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var browserSync = require('browser-sync').create();

gulp.task('css', function(){
	return gulp.src('src/sass/csstart.scss')

	.pipe(p.sourcemaps.init())
		.pipe(p.sass())
		.pipe(p.csscomb())
		.pipe(p.cssbeautify({indent: '	'}))
		.pipe(p.postcss([
			autoprefixer()
		]))
	.pipe(p.sourcemaps.write("./"))

	.pipe(gulp.dest('build/css'));
});

gulp.task('css-min', function(){
	return gulp.src('src/sass/csstart.scss')

	.pipe(p.sass())
	.pipe(p.csscomb())
	.pipe(p.cssbeautify({indent: '	'}))
	.pipe(p.postcss([
		autoprefixer(),
		cssnano()
	]))

	.pipe(p.rename({
      suffix: '.min'
    }))
	.pipe(gulp.dest('build/css'));
});

gulp.task('watch',  function() {
	browserSync.init({
		proxy: {
	        target: "localhost"
	    }
	});
    gulp.watch('src/sass/**/*.scss', gulp.series('default')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('css', 'css-min'));
