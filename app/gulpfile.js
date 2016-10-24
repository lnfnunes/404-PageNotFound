var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require("gulp-open"),
    webpack = require('webpack-stream'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    port = process.env.port || 3031;

// bundle files and transform JSX
gulp.task('webpack', function() {
  gulp.src('./src/js/main.js')
    .pipe( webpack( require('./webpack.config.js') ) )
    .pipe(gulp.dest('./dist/js'));
});

// minify and move image
gulp.task('img', function() {
    gulp.src('./src/img/*')
      .pipe(imagemin({
        progressive: true,
        use: [pngquant()]
      }))
      .pipe(gulp.dest('./dist/img'));
});

// launch browser in a port
gulp.task('open', function(){
  var options = {
    url: 'http://localhost:' + port,
  };
  gulp.src('./index.html')
  .pipe(open('', options));
});

// live reload server
gulp.task('connect', function() {
  connect.server({
    port: port,
    livereload: true
  });
});

// live reload js
gulp.task('js', function () {
  gulp.src('./dist/**/*.js')
    .pipe(connect.reload());
});

// live reload html
gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

// watch files for live reload
gulp.task('watch', function() {
    gulp.watch('dist/js/*.js', ['js']);
    gulp.watch('index.html', ['html']);
    gulp.watch('src/js/**/*.js', ['webpack']);
    gulp.watch('src/img/**/*.png', ['img']);
});

gulp.task('default', ['webpack']);

gulp.task('serve', ['webpack', 'connect', 'open', 'watch']);
