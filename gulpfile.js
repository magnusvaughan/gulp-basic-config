var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache');

gulp.task('default', [], function () {
    gulp.start('browserify', 'styles', 'scripts', 'images' );
});

gulp.task('browserify', function() {
    return browserify('./assets/js/vendor/bootstrap.js').bundle()
    // vinyl-source-stream makes the bundle compatible with gulp
        .pipe(source('dependencies.js')) // Desired filename
        // Output the file
        .pipe(gulp.dest('./assets/js/vendor/'));
});

/**
 * Compile / Concatenate styles
 */
gulp.task('styles', function () {
    return sass('assets/css/sass/style.scss', {style: 'expanded'})
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('./'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('./'))
        .pipe(notify({message: 'Styles task complete'}));
});

/**
 * Concatenate Javascripts
 */
gulp.task('scripts', function () {
    // return gulp.src('assets/js/*.js')
    return gulp.src(['assets/js/vendor/dependencies.js','assets/js/first.js', 'assets/js/second.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({
            mangle: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(notify({message: 'Scripts task complete'}));
});

/**
 * Optimise images
 */
gulp.task('images', function () {
    return gulp.src('assets/img/**/*')
        .pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true})))
        .pipe(gulp.dest('assets/img'))
        .pipe(notify({message: 'Images task complete'}));
});

/**
 * Watchers
 */
gulp.task('watch', function () {
    gulp.watch('./assets/css/sass/*.scss', ['styles']);
    gulp.watch('./assets/js/*.js', ['scripts']);
    gulp.watch('./assets/img/*', ['images']);

});
