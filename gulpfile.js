const gulp = require('gulp')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const cleanCss = require('gulp-clean-css')
const concat = require('gulp-concat')

function styles () {
  return gulp.src('./public/src/scss/**/init.scss')
    .pipe(sass()).on('error', sass.logError)
    .pipe(rename({
      basename: 'style'
    }))
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/dist/css/'))
}

function watch () {
  gulp.watch('./public/src/scss/**/*.scss', styles)
  gulp.watch('./public/src/img/**/*', img)
  gulp.watch('./public/src/js/**/*.js', scripts)
}


function img () {
  const images = './public/src/img/**/*'

  return gulp.src([images])
    .pipe(gulp.dest('./public/dist/img/'))
}

function scripts () {
  const customJs = './public/src/js/**/*.js'

  return gulp.src([customJs])
    .pipe(concat('script.js'))
    .pipe(rename({
      basename: 'script',
      extname: '.js'
    }))
    .pipe(gulp.dest('./public/dist/js/'))
}


exports.watch = watch
exports.styles = styles
exports.img = img
exports.scripts= scripts

const build = gulp.series(gulp.parallel(styles, img, scripts))
gulp.task('default', build)
