var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	prefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	plumber = require('gulp-plumber'),
	babel = require('gulp-babel');

gulp.task('scss', function() {
	return gulp.src('./src/scss/*.scss')
				.pipe(sass())
				.pipe(prefixer({browsers: ['last 3 versions']}))
				.pipe(csso())
				.pipe(gulp.dest('./dist/css/'));
	});

gulp.task('image-o', function() {
	gulp.src('./src/img/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/img/'));
});

gulp.task('babel', function() {
	gulp.src('./src/js/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('dev', function() {
  	browserSync.init(['./dist/css/*.css', './dist/*.html', './dist/js/*.js'], {
	    server: {
	    	baseDir: './dist/'
	    }
	});

  gulp.watch(['./src/scss/*.scss'], ['scss']);
  gulp.watch(['./src/img/*.*'], ['image-o']);
  gulp.watch(['./src/js/*.js'], ['babel']);
});

