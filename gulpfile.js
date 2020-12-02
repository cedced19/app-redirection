var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var log = require('gulplog');
var htmlmin = require('gulp-htmlmin');
var through = require('through');

var isDist = process.argv.indexOf('serve') === -1;

gulp.task('html', function () {

    return gulp.src('dev/*.html')
        .pipe(isDist ? htmlmin({collapseWhitespace: true, minifyCSS: true, minifyJS: true}) : through())
        .pipe(gulp.dest('./'));
});


gulp.task('html-watch', ['html'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', function () {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('dev/*.html', ['html-watch']);

});

gulp.task('default', ['html']);