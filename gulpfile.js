'use strict';

const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const { task, src, dest, watch, series, parallel } = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

task('clean', () => {
// function clean() {
  return del(['./public/styles']);
})

task('styles', () => {
// function styles() {
  const options = {
    //outputStyle: 'compressed'         //nested | expanded | compact | compressed
    includePaths: [
      './node_modules/bootstrap/scss',
      './node_modules/@fortawesome/fontawesome-free/scss'
    ]
  }

  const packages = [
    require('autoprefixer')('last 2 version'),
    require('cssnano')
  ]

  return src('./resources/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(options).on('error', sass.logError))
    .pipe(postcss(packages))
    .pipe(sourcemaps.write())
    .pipe(dest('./public/styles'));
})

task('watch', () => {
// function foo() {
  watch('./resources/scss/**/*.{scss, sass}', series('styles'));
})

/*
*  Task runners
**/
exports.build = series('clean', parallel('styles') );

exports.default = series('clean', parallel('styles' ), 'watch' );
