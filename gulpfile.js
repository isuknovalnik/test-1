var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

var server = require("browser-sync");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var del = require("del");
var run = require("run-sequence");

var jsmin = require("gulp-jsmin");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var inject = require("gulp-inject");
var concat = require("gulp-concat");

var watch = require('gulp-watch');
var pug = require('gulp-pug');
var prettify = require("gulp-jsbeautifier");

function fileContents (filePath, file) {
  return file.contents.toString();
}

gulp.task("styles", function() {
  gulp.src("source/styles/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions",
        "IE 11"
      ]})
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.reload({stream: true}));
});

gulp.task("templates", function() {
  var sprite = gulp.src("build/sprite/symbols.svg");
	gulp.src("source/*.pug")
		.pipe(plumber())
		.pipe(pug({basedir: "source"}))
		.pipe(prettify({
			indent_with_tabs: true,
			indent_inner_html: true,
			preserve_newlines: true,
			max_preserve_newlines: 50
		}))
    .pipe(inject(sprite, { transform: fileContents }))
		.pipe(rename({dirname: '.'}))
		.pipe(gulp.dest("build"))
		.pipe(server.reload({stream: true}));
});

gulp.task("jscript", function () {
  gulp.src("source/js/*.js")
    .pipe(plumber())
    .pipe(concat("script.js"))
    .pipe(jsmin())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js/"))
    .pipe(server.reload({stream: true}));
});

gulp.task("libs", function () {
  gulp.src([
    "source/lib/jquery-3.3.1.min.js",
    "source/lib/*.{js,min.js}"
  ])
    .pipe(plumber())
    .pipe(concat("libs.min.js"))
    .pipe(gulp.dest("build/js/"))
    .pipe(server.reload({stream: true}));
});

gulp.task("serve", function() {
  server.init({
    server: "build",
    open: false
  });

  watch('source/{styles,blocks}/**/*.scss', {readDelay: 200}, function(event, cb) {
    gulp.start('styles');
  });
	gulp.watch("source/**/*.pug", ["templates"]);
  gulp.watch("source/lib/**/*.js", ["libs"]);
  gulp.watch("source/js/**/*.js", ["jscript"]);
});

gulp.task("images", function () {
  return gulp.src("build/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function() {
  var cleanSymbols = del("build/sprite/symbols.svg");
  return gulp.src("source/icons/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
       inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("build/sprite"));
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**/*",
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("debug", function(fn) {
  run(
    "clean",
    "copy",
    "symbols",
    "templates",
    "styles",
    "libs",
    "jscript",
    fn
  );
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "symbols",
    "templates",
    "images",
    "styles",
    "libs",
    "jscript",
    fn
  );
});

