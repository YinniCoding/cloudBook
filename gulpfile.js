var gulp = require("gulp");
var rename = require("gulp-rename");
var minifyCss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var minifyHtml = require('gulp-minify-html');
var concat = require('gulp-concat');

gulp.task('css',function(){
    gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    //.pipe(concat('main.css'))
    .pipe(gulp.dest('css/dst/'));
});

gulp.task('js',function(){
    gulp.src('js/*.js')
    .pipe(uglify())
    //.pipe(concat('main.js'))
    .pipe(gulp.dest('js/dst'));
});

gulp.task('html',function(){
    gulp.src('*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('dst/'));

});

gulp.task('default',['css','js','html'],function(){
    console.log('gulp task ok!');
});
