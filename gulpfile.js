var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var tildeImporter = require('node-sass-tilde-importer');
var browserSync   = require('browser-sync').create();

var webpack       = require('webpack');

var isProduction  = !!$.util.env.production;

var paths = {
    svg: {
        src: 'src/img/svg/*.svg',
        dest: 'assets/img'
    },
    icons: {
        src: 'src/img/icons/*.svg',
        dest: 'assets/img'
    },
    images: {
        src: 'src/img/*.{jpg,png,gif}',
        dest: 'assets/img'
    },
    sass: {
        src: 'src/sass/style.scss',
        dest: 'assets/css'
    },
    templates: {
        src: 'src/templates/*.ejs',
        dest: ''
    }
};


/**
 * SVG
 */
gulp.task('svg2png', function() {
    var svg = gulp.src(paths.svg.src);

    svg
        .pipe($.changed(paths.svg.dest, { extension: '.png' }))
        .pipe($.svg2png())
        .pipe($.imagemin())
        .pipe(gulp.dest(paths.svg.dest));

    svg
        .pipe($.changed(paths.svg.dest))
        .pipe($.imagemin())
        .pipe(gulp.dest(paths.svg.dest));

    return svg;
});


/**
 * Icons
 */
gulp.task('svgicons', function() {
    var path = require('path');

    return gulp.src(paths.icons.src)
        .pipe($.imagemin([
            $.imagemin.svgo(function(file) {
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
            })
        ]))
        .pipe($.svgstore())
        .pipe(gulp.dest(paths.icons.dest));
});


/**
 * Images
 */
gulp.task('images', function() {
    gulp.src(paths.images.src)
        .pipe($.changed(paths.images.dest))
        .pipe($.imagemin())
        .pipe(gulp.dest(paths.images.dest));
});


/**
 * Sass
 */
gulp.task('sass', function() {
    return gulp.src(paths.sass.src)
        .pipe(isProduction ? $.util.noop() : $.sourcemaps.init())
        .pipe($.sass({
            importer: tildeImporter
        }).on('error', $.sass.logError))
        .pipe(isProduction ? $.autoprefixer(['last 2 versions', 'ie 8', 'ie 9', '> 1%']) : $.util.noop())
        .pipe(isProduction ? $.csso() : $.util.noop())
        .pipe(isProduction ? $.util.noop() : $.sourcemaps.write(''))
        .pipe(gulp.dest(paths.sass.dest))
        .pipe(browserSync.stream());
});


/**
 * JavaScript
 */
gulp.task('scripts', function(cb) {
    var webpackConfig = require('./webpack.config.js')();
    var bundler       = webpack(webpackConfig);

    bundler.watch(200, function(err, stats) {
        if (err) {
            throw new $.util.PluginError('webpack', err);
        }

        $.util.log('[webpack]', stats.toString('minimal'));

        browserSync.reload(webpackConfig.output.filename);
    });

    return cb();
});


/**
 * Templates
 */
gulp.task('template', function() {
    return gulp.src([paths.templates.src])
        .pipe($.ejs({}, {}, { ext: '.html' }))
        .pipe(gulp.dest(paths.templates.dest));
});


/**
 * Live preview
 */
gulp.task('serve', function() {
    var ejsMiddleware = function(req, res, next) {
        var parsed = require('url').parse(req.url);
        if (parsed.pathname.match(/\.html$/)) {
            var ejs = require('ejs');
            var ejsFile = 'src/templates/' + parsed.pathname.replace('.html', '.ejs');
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
        notify: false,
        scrollRestoreTechnique: 'cookie',
        files: [
            '*.html',
            'assets/img/*.{jpg,png,svg,gif,webp,ico}'
        ],
        server: {
            baseDir: '',
            directory: true,
            middleware: [ejsMiddleware]
        }
    });
});


/**
 * Build
 */
gulp.task('build', ['template', 'sass', 'scripts', 'svgicons', 'svg2png', 'images'], function() {
    $.util.log($.util.colors.green('Build is finished'));
});


/**
 * Watch files
 */
gulp.task('watch', ['serve'], function() {
    /* Watch HTML */
    gulp.watch(['**/*.ejs'], { cwd: 'src/templates' }, ['template']);

    /* Watch styles */
    gulp.watch(['**/*.scss'], { cwd: 'src/sass' }, ['sass']);

    /* Watch SVG */
    gulp.watch(['*.svg'], { cwd: 'src/img/icons' }, ['svgicons']);
    gulp.watch(['*.svg'], { cwd: 'src/img/svg' },   ['svg2png']);

    /* Watch images */
    gulp.watch(['*.{jpg,png,gif}'], { cwd: 'src/img' }, ['images']);
});


/**
 * Default task
 */
gulp.task('default', ['watch', 'build']);
