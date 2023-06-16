const { src, dest, watch, parallel, series } = require("gulp");
// css
const sass = require("gulp-sass")(require("sass"));
const mediaqueries = require("gulp-group-css-media-queries");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
// html
const rigger = require("gulp-rigger");
// browser-sync
const browserSync = require("browser-sync").create();
// js
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const eslint = require("gulp-eslint");
const babel = require("gulp-babel");
// images
const imagemin = require("gulp-imagemin");
const jpegRecompress = require("imagemin-jpeg-recompress");
const webp = require("gulp-webp");
// svg
const svgmin = require("gulp-svgmin");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const svgSprite = require("gulp-svg-sprite");
// other
const gulpif = require("gulp-if");
const del = require("del");
// my variables for dev
const isDev = process.argv.includes("--dev");
const isProd = !isDev;
const isSprite = process.argv.includes("--sprite");

function html() {
  return src("app/index.html")
    .pipe(rigger())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(isProd, mediaqueries()))
    .pipe(
      gulpif(
        isProd,
        autoprefixer({
          overrideBrowserslist: ["last 10 version"],
          browsers: [">0.1%"],
          grid: true,
        })
      )
    )
    .pipe(gulpif(isProd, cleancss()))
    .pipe(concat("style.css"))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

function stylesVendor() {
  return src(["./node_modules/swiper/swiper-bundle.min.css"]) //стили из пакетов node_modules
    .pipe(concat("styleVendor.css"))
    .pipe(dest("dist/css"));
}

function scripts() {
  return src(["app/js/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(
      eslint.result((result) => {
        console.log(`ESLint result: ${result.filePath}`);
        console.log(`# Messages: ${result.messages.length}`);
        console.log(`# Warnings: ${result.warningCount}`);
        console.log(`# Errors: ${result.errorCount}`);
      })
    )
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("main.js"))
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
}

function scriptsVendor() {
  return src(["./node_modules/swiper/swiper-bundle.min.js"]) //стили из пакетов node_modules
    .pipe(concat("scriptsVendor.js"))
    .pipe(dest("dist/js"));
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "dist/",
    },
  });
}

function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.js"], scripts);
  watch(["app/index.html", "app/html/*"], html);
  watch(["app/images/**/*"], images);
  watch(["app/images/svg/*"], svg);
  watch(["app/fonts/**/*"], fonts);
}

function cleanDist() {
  return del("dist");
}

function images() {
  return src("app/images/static/**/*")
    .pipe(
      gulpif(
        isProd,
        imagemin([
          jpegRecompress({
            loops: 4,
            min: 70,
            max: 80,
            quality: "high",
          }),
          imagemin.gifsicle({ interlaced: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
        ])
      )
    )
    .pipe(webp())
    .pipe(dest("dist/images/static/"));
}

function svg() {
  return src("app/images/svg/*")
    .pipe(
      gulpif(
        isSprite,
        svgmin({
          js2svg: {
            pretty: true,
          },
        })
      )
    )
    .pipe(
      gulpif(
        isSprite,
        cheerio({
          run: function ($) {
            $("[fill]").removeAttr("fill");
            $("[stroke]").removeAttr("stroke");
            $("[style]").removeAttr("style");
            $("[fill-opacity]").removeAttr("fill-opacity");
          },
          parserOptions: { xmlMode: true },
        })
      )
    )
    .pipe(gulpif(isSprite, replace("&gt", ">")))
    .pipe(
      gulpif(
        isSprite,
        svgSprite({
          mode: {
            symbol: {
              sprite: "all.svg",
            },
          },
        })
      )
    )
    .pipe(replace("&gt", ">"))
    .pipe(dest("dist/images/svg"));
}

function fonts() {
  return src("app/fonts/**/*")
    .pipe(dest("dist/fonts"))
    .pipe(browserSync.stream());
}

exports.html = html;
exports.styles = styles;
exports.stylesVendor = stylesVendor;
exports.scripts = scripts;
exports.scriptsVendor = scriptsVendor;

exports.browsersync = browsersync;
exports.watching = watching;
exports.cleanDist = cleanDist;

exports.images = images;
exports.svg = svg;
exports.fonts = fonts;

exports.build = series(
  cleanDist,
  parallel(html, styles, stylesVendor, scripts, scriptsVendor, images, svg, fonts)
);
exports.default = parallel(browsersync, watching);
