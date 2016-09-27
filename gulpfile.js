var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var browserSync   = require('browser-sync').create();

var webpack       = require('webpack');
var webpackConfig = require('./webpack.config.js');
var bundler       = webpack(webpackConfig);


/**
 * SVG
 */
gulp.task('svg2png', function() {
  var svg = gulp.src(['./src/img/svg/*.svg']);

  svg
    .pipe($.changed('./assets/img/', { extension: '.png' }))
    .pipe($.svg2png())
    .pipe(gulp.dest('./assets/img/'));

  svg
    .pipe($.changed('./assets/img/'))
    .pipe($.svgmin())
    .pipe(gulp.dest('./assets/img/'));

  return svg;
});


/**
 * Icons
 */
gulp.task('svgicons', function() {
  var path = require('path');

  return gulp.src(['./src/img/icons/*.svg'])
    .pipe($.svgmin(function(file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          removeAttrs: { attrs : 'fill' },
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      };
    }))
    .pipe($.svgstore())
    .pipe(gulp.dest('./assets/img/'));
});


/**
 * Sass
 */
gulp.task('sass', function() {
  return gulp.src(['./src/sass/style.scss'])
    .pipe($.sourcemaps.init())
      .pipe(
        $.sass({
          includePaths: ['./node_modules/'],
          outputStyle: 'expanded'
        })
        .on('error', $.sass.logError)
      )
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./assets/css/'))
    .pipe(browserSync.stream());
});

gulp.task('sass:release', function() {
  return gulp.src(['./assets/css/style.css'])
    .pipe($.autoprefixer(['last 2 versions', 'ie 8', 'ie 9', '> 1%']))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.csso())
    .pipe(gulp.dest('./assets/css/'));
});


/**
 * Javascript
 */
gulp.task('scripts', function(cb) {
  var handler = function(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    $.util.log('[webpack]', stats.toString('normal'));

    browserSync.reload(webpackConfig.output.filename);
  };

  bundler.watch(200, handler);

  return cb();
});


/**
 * Templates
 */
gulp.task('template', function() {
  return gulp.src(['./src/ejs/*.ejs'])
    .pipe($.ejs(null, { ext: '.html' }))
    .pipe($.htmlReplace({ js: 'assets/js/bundle.min.js', css: 'assets/css/style.min.css' }))
    .pipe(gulp.dest('./'));
});


/**
 * Live preview
 */
gulp.task('serve', function() {
  var ejsMiddleware = function(req, res, next) {
    var parsed = require('url').parse(req.url);

    if (parsed.pathname.match(/\.html$/)) {
      var ejs     = require('ejs');
      var ejsFile = './src/ejs/' + parsed.pathname.replace('.html', '.ejs');

      return ejs.renderFile(ejsFile, {}, {
        query: parsed.query,
        filename: ejsFile
      }, function(err, contents) {
        if (!err) {
          res.end(contents);
        }
      });
    }

    next();
  };

  browserSync.init({
    open: false,
    ghostMode: false,
    online: false,
    files: [
      './*.html',
      './assets/img/*.{jpg,png,svg,gif,webp,ico}'
    ],
    server: {
      baseDir: './',
      directory: true,
      middleware: [ejsMiddleware]
    }
  });
});


/**
 * Build
 */
gulp.task('build', ['template', 'sass', 'scripts', 'svg2png'], function() {
  $.util.log($.util.colors.green('Build is finished'));
});


/**
 * Watch files
 */
gulp.task('watch', ['serve'], function() {
  /* Watch HTML */
  gulp.watch(['**/*.ejs'], { cwd: './src/ejs/' }, ['template']);

  /* Watch styles */
  gulp.watch(['**/*.scss'], { cwd: './src/sass/' }, ['sass']);

  /* Watch SVG */
  gulp.watch(['*.svg'], { cwd: './img/icons/' }, ['svgicons']);
  gulp.watch(['*.svg'], { cwd: './img/svg/' },   ['svg2png']);
});


/**
 * Default task
 */
gulp.task('default', ['watch', 'build']);