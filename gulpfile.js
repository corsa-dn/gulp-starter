var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	prefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	plumber = require('gulp-plumber'),
	babel = require('gulp-babel'),
	pug = require('gulp-pug'),
	notify = require('gulp-notify');

gulp.task('pug', function () {
	return gulp.src('./src/views/*.pug')
		.pipe(plumber({
			errorHandler: notify.onError()
		}))
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.stream());
})

gulp.task('scss', function () {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(plumber({
			errorHandler: notify.onError()
		}))
		.pipe(sass())
		.pipe(prefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(csso())
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('image-o', function () {
	gulp.src('./src/img/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/img/'));
});

gulp.task('babel', function () {
	gulp.src('./src/js/*.js')
		.pipe(plumber({
			errorHandler: notify.onError()
		}))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('dev', function () {
	browserSync.init(['./src/views/**/*.pug', './dist/css/*.css', './dist/*.html', './dist/js/*.js'], {
		server: {
			baseDir: './dist/'
		}
	});

	gulp.watch(['./src/views/**/*.pug'], ['pug']);
	gulp.watch(['./src/scss/**/*.scss'], ['scss']);
	gulp.watch(['./src/img/*.*'], ['image-o']);
	gulp.watch(['./src/js/*.js'], ['babel']);
});