const { src, dest, watch, parallel, series } = require('gulp')
// css
const sass                  = require('gulp-sass')
const mediaqueries          = require('gulp-group-css-media-queries')
const autoprefixer          = require('gulp-autoprefixer')
const cleancss              = require('gulp-clean-css')
const smartgrid             = require('smart-grid')
// html
const rigger                = require('gulp-rigger')
// browser-syc
const browserSync           = require('browser-sync').create()
// js
const concat                = require('gulp-concat')
const uglify                = require('gulp-uglify-es').default
// minify images
const imagemin              = require('gulp-imagemin')
const jpegRecompress        = require('imagemin-jpeg-recompress')
const svgmin                = require('gulp-svgmin')
const cheerio               = require('gulp-cheerio')
const replace               = require('gulp-replace')
const svgSprite             = require('gulp-svg-sprite')
// other
const gulpif                = require('gulp-if')
const del                   = require('del')
// my variables for dev
const isDev = process.argv.includes('--dev')
const isProd = !isDev

function html() {
    return src('app/index.html')
        .pipe(rigger())
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

function styles() { 
    return src('app/sass/style.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(mediaqueries())
        .pipe(gulpif(isProd, autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            browsers: ['>0.1%'],
            grid: true
        })))
        .pipe(gulpif(isProd, cleancss()))
        .pipe(concat('style.css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}

function stylesVendor() {
    return src(['node_modules/swiper/swiper-bundle.min.css'])
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            browsers: ['>0.1%'],
            grid: true
        }))
        .pipe(gulpif(isProd, cleancss()))
        .pipe(concat('styleVendor.css'))
        .pipe(dest('dist/css/vendor'))
}

function grid(done) {
    let settings = {
        outputStyle: 'sass', /* less || scss || sass || styl */
        columns: 12,
        offset: '30px',
        mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
        container: {
            maxWidth: '1110px', /* max-width оn very large screen */
            fields: '18.5px' /* side fields */
        },
        breakPoints: {
            md : {
                width: "992px",
            },
            sm: {
                width: "768px"
            },
            xs: {
                width: "576px"
            },
            xxs: {
                width: "420px"
            }
        }
    }

    smartgrid('app/sass/modules', settings)
    done()
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'app/js/**/*.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulpif(isProd, uglify()))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    })
}

function watching() {
    watch(['app/sass/**/*.sass'],            styles)
    watch(['app/js/**/*.js'],               scripts)
    watch(['app/index.html', 'app/html/*'],    html)
    watch(['app/images/**/*'],               images)
    watch(['app/images/svgs/*'],                svg)
    watch(['app/fonts/**/*'],                 fonts)
}

function cleanDist() {
    return del('dist')
}

function images() {
    return src('app/images/static/**/*')
        .pipe(imagemin([
            jpegRecompress({
                loops: 4,
                min: 70,
                max: 80,
                quality: 'high'
            }),
            imagemin.gifsicle({interlaced: true}),
            imagemin.optipng({optimizationLevel: 5}),
        ]))
        .pipe(dest('dist/images/static/'))
}

function svg() {
    return src('app/images/svgs/*')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        })) 
        .pipe(cheerio({
            run: function($) {
                $('[fill]').removeAttr('fill')
                $('[stroke]').removeAttr('stroke')
                $('[style]').removeAttr('style')
                $('[fill-opacity]').removeAttr('fill-opacity')
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: 'all.svg'
                }
            }
        }))
        .pipe(dest('dist/images/svgs'))
}

function fonts() {
    return src('app/fonts/**/*')
        .pipe(dest('dist/fonts'))
        .pipe(browserSync.stream())
}

exports.html         = html
exports.styles       = styles
exports.stylesVendor = stylesVendor
exports.grid         = grid
exports.scripts      = scripts

exports.browsersync  = browsersync
exports.watching     = watching
exports.cleanDist    = cleanDist

exports.images       = images
exports.svg          = svg
exports.fonts        = fonts

exports.build       = series(cleanDist, parallel(html, styles, stylesVendor, scripts, images, svg, fonts))
exports.default     = parallel(browsersync, watching)