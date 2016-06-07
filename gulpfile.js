const gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');
const stylus = require('gulp-stylus');
const uglify = require('gulp-uglify');

gulp.task('run-clean', () => {
  return gulp.src('./public')
    .pipe(clean());
});

gulp.task('run-concat-uglify', () => {
  return gulp.src(['./scripts/master.js'])
    .pipe(concat('master.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts'));
});

gulp.task('run-lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('run-nodemon', () => {
  return nodemon({
    script: 'index.js',
    ext: 'js'
  });
});

gulp.task('run-stylus', () => {
  return gulp.src('./styles/master.styl')
    .pipe(stylus({compress: true}))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('run-test', () => {
  return gulp.src('./test/**/*.js', {read: false})
    .pipe(mocha());
});

gulp.task('build', ['run-clean'], () => {
  return gulp.start(['run-stylus', 'run-concat-uglify']);
});

gulp.task('dev', ['build'], () => {
  return gulp.start(['run-nodemon']);
});

gulp.task('test', ['build'], () => {
  return gulp.start(['run-lint', 'run-test']);
});
