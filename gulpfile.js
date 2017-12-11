"use strict";

const gulp = require("gulp");
const uglify = require("gulp-uglify");
var notify = require("gulp-notify");
const jshint = require("gulp-jshint");
const plumber = require("gulp-plumber");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass");
const watch = require("gulp-watch");
const minify = require("gulp-minify");
// const browserSync = require('browser-sync');

const browserSync = require("browser-sync").create();
// const reload      = browserSync.reload;


const imagemin = require("gulp-imagemin");
var csslint = require("gulp-csslint");
const del = require("del");
var run = require("run-sequence");
var sourcemaps = require("gulp-sourcemaps");
var cssmin = require("gulp-cssmin");
var gulpIf = require("gulp-if");
var bower = require("gulp-bower");
var spritesmith = require("gulp.spritesmith");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

gulp.task("scriptsLibs", function () {
  return gulp.src([
    "libs/jquery/dist/jquery.min.js",
    "libs/magnific-popup/dist/jquery.magnific-popup.min.js"
])
  .pipe(concat("libs.min.js"))
  .pipe(uglify())
  .pipe(gulp.dest("js"));
});

gulp.task("scripts", function () {
  return gulp.src("js/script.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("js"));
});

gulp.task("style", function() {
  return gulp.src("sass/style.scss")
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: "Error",
          message: err.message
        };
      })
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});


// const paths = {
//   html:['index.html'],
//   css:['sass/style.scss']
//   // script:['js/*.js']
// };

gulp.task("mincss", function(){
  return gulp.src("css/style.css")
    .pipe(gulp.dest("css"))
    .pipe(cssmin())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("css"));
    // .pipe(reload({stream:true}));
});

gulp.task("mincssLibs", function(){
  return gulp.src("sass/libs.scss")
    .pipe(sass())
    .pipe(gulp.dest("css"))
    .pipe(cssmin())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("css"));
    // .pipe(reload({stream:true}));
});

// gulp.task('html', function(){
//   gulp.src(paths.html)
//   .pipe(reload({stream:true}));
// });

// last browserSync

// gulp.task('browserSync', function() {
//   browserSync({
//     server: {
//       baseDir: "./"
//     },
//     port: 8080,
//     open: true
//   });
// });

// gulp.task('scripts', function(){
//   return gulp.src(paths.script)
//     // .pipe(uglify())
//     .pipe(gulp.dest('js'))
//     .pipe(reload({stream:true}));
// });

// gulp.task('watcher',function(){
//   gulp.watch("sass/**/*.{scss,sass}", ["style"]);
//   gulp.watch("*.html").on("change", browserSync.reload);
//   gulp.watch("*.html", ["html"]);
//   gulp.watch("js/**/*.js", ["html"]);
// });

// gulp.task('serve', ['watcher', 'browserSync']);


// minimg

gulp.task("images", function () {
  return gulp.src("img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
      ]))
    .pipe(gulp.dest("img"));
});

gulp.task("build", function(done) {
  run("clean", "copy", "style", done);
});

gulp.task("clean",function () {
  return del("dist");
});

gulp.task("copy", function () {
  return gulp.src([
    "*.html",
    "fonts/**/*.woff",
    "fonts/**/*.woff2",
    "img/**",
    "js/**",
    "css/*.css"
    ], {
      base: "."
    })
    .pipe(gulp.dest("dist"));
});

gulp.task("minfiles", function(done) {
  run("images", "scripts", "mincss","mincssLibs", done);
});

// NODE_ENV=production gulp style

// new browserSync

gulp.task("browserSync", function () {
  browserSync.init({
    server: 
    {baseDir: "./"},
      port: 8080,
      open: true,
      notify: false
  });
  // gulp.watch("sass/**/*.{scss,sass}", ["style"]).on('change', browserSync.reload);
  // browserSync.watch("*.html").on('change', browserSync.reload);
  // gulp.watch("sass/**/*.{scss,sass}", ["style"])
})

gulp.task("watcher", ["scriptsLibs"], function(){
  gulp.watch("sass/**/*.{scss,sass}", ["style"]).on("change", browserSync.reload);
  // gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("js/**/*.js", ["scripts"]).on("change", browserSync.reload);
  // gulp.watch("sass/**/*.{scss,sass}", ["style"]).on('change', browserSync.reload);
  gulp.watch("*.html", browserSync.reload);
});

gulp.task("serve", ["watcher", "browserSync"]);

gulp.task("sprite", function() {
    var spriteData = 
        gulp.src("img/sprite/*.*")
            .pipe(spritesmith({
                imgName: "sprite.png",
                cssName: "sprite.css",
                padding: 20
            }));

    spriteData.img.pipe(gulp.dest("sprite/img"));
    spriteData.css.pipe(gulp.dest("sprite/style"));
});
