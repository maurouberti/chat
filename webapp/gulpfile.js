const gulp = require('gulp')
const connect = require('gulp-connect')
const notify = require('gulp-notify')
const livereload = require('gulp-livereload')
const changed = require('gulp-changed')
const del = require('del')
const gutil = require('gulp-util')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const imagemin = require('gulp-imagemin')
const minifyCss = require('gulp-minify-css')
const minifyHtml = require('gulp-minify-html')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')

const paths = {
	fontsSrc: 'src/fonts/',
	htmlSrc:  'src/',
	sassSrc:  'src/scss/',
	jsSrc:    'src/js/',
	imgSrc:   'src/images/',
	
	buildDir: 'build/',
	revDir:   'build/rev/',
	distDir:  'dist/',
}

let onError = (err) => {
	gutil.beep()
	gutil.log(gutil.colors.red(err))
}

gulp.task('build-html', () => {
	return gulp
			.src(paths.htmlSrc.concat('**/*.html'))
			.pipe(gulp.dest(paths.buildDir.concat('/')))
			.pipe(livereload())
})

gulp.task('build-css', () => {
	return gulp
			.src(paths.sassSrc.concat('**/*.scss'))
			.pipe(sass({
				includePaths: require('node-neat').includePaths,
				style: 'nested',
				onError: function() {
					console.log('SASS ERROR')
				}
			}))
			.pipe(plumber({ errorHandler: onError }))
			.pipe(gulp.dest(paths.buildDir.concat('/css')))
			.pipe(livereload())
})

gulp.task('build-js', () => {
	return gulp
			.src(paths.jsSrc.concat('*.js'))
			.pipe(plumber({ errorHandler: onError }))
			.pipe(changed(paths.buildDir.concat('/js')))
			.pipe(gulp.dest(paths.buildDir.concat('/js')))
			.pipe(livereload())
})

gulp.task('build-fonts', () => {
	return gulp
			.src(paths.fontsSrc.concat('**/**'))
			.pipe(gulp.dest(paths.buildDir.concat('/fonts')))
			.pipe(livereload())
})

gulp.task('build-images', () => {
	return gulp
			.src(paths.imgSrc.concat('**/*.+(png|jpg|jpeg|gif|svg)'))
			.pipe(changed(paths.buildDir.concat('/images')))
			.pipe(gulp.dest(paths.buildDir.concat('/images')))
			.pipe(livereload())
})

gulp.task('build', gulp.series(['build-html', 'build-css', 'build-js', 'build-images', 'build-fonts'], () => {
	return connect.server({
		root: 'build',
		livereload: true
	})
}))

gulp.task('watch', () => {
	gulp.watch('src/*.html', ['build-html'])
	gulp.watch('src/scss/**', ['build-css'])
	gulp.watch(paths.jsSrc.concat('**/*.js'), ['build-js'])
	gulp.watch(paths.imgSrc.concat('**/*.+(png|jpg|jpeg|gif|svg)'), ['build-images'])
})

const ENV = process.env.NODE_ENV || 'development'

if (ENV === 'development') {
	return gulp.task('default', gulp.series(['build', 'watch']))
}