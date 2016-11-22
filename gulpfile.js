var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('default', [], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('styles', function() {
    return sass('sass/style.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('./'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('./'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    // return gulp.src('assets/js/*.js')
    return gulp.src(['assets/js/second.js','assets/js/app.js'])
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
    return gulp.src('assets/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('assets/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

// gulp.task('clean', function() {
//     return del(['sass', 'assets/js', 'assets/img']);
// });

gulp.task('watch', function() {

// Watch .scss files
gulp.watch('./sass/*.scss', ['styles']);

// Watch .js files
gulp.watch('./assets/js/*.js', ['scripts']);

// Watch image files
gulp.watch('./assets/img/*', ['images']);

});

// gulp.task('watch', function() {
//
//     // Create LiveReload server
//     livereload.listen();
//
//     // Watch any files in dist/, reload on change
//     gulp.watch(['./**']).on('change', livereload.changed);
//
// });