var gulp = require("gulp"),
  connect = require("gulp-connect"),
  livereload = require("gulp-livereload"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  plumber = require("gulp-plumber"),
  rename = require("gulp-rename"),
  minifycss = require("gulp-minify-css"),
  uglify = require("gulp-uglify"),
  notify = require("gulp-notify"),
  spritesmith = require("gulp.spritesmith"),
  httpProxy = require("http-proxy"),
  fs = require("fs"),
  browserSync = require("browser-sync").create();

httpProxy
  .createServer({
    ssl: {
      key: fs.readFileSync("key.pem", "utf8"),
      cert: fs.readFileSync("cert.pem", "utf8"),
    },
    target: "http://localhost:8080",
    secure: false, // Depends on your needs, could be false.
  })
  .listen(9009);

gulp.task("connect", function () {
  connect.server({
    livereload: true,
  });
});

gulp.task("sprite", function () {
  var spriteData = gulp.src("./img/sprites/*.png").pipe(
    spritesmith({
      /* this whole image path is used in css background declarations */
      imgName: "/Custom/Content/Themes/Shared/Assets/Sprites/sprite.png",
      cssName: "sprite.css",
    })
  );
  spriteData.img.pipe(gulp.dest("./Shared/Assets/Sprites"));
  spriteData.css.pipe(gulp.dest("./css"));
});

/*gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});*/

gulp.task("html", function () {
  gulp.src(["*.html", "*.php"]).pipe(livereload());
});

gulp.task("sass", function () {
  gulp
    .src("./src/scss/**/*.scss")
    .pipe(connect.reload())
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errLogToConsole: true,
        sourceComments: true,
      })
    )
    .pipe(gulp.dest("./css"))

    .pipe(rename({ suffix: ".min" }))
    .pipe(minifycss())
    .pipe(gulp.dest("./css/min"))

    .pipe(sourcemaps.write("./maps"))

    //.pipe( gulp.dest('./css') )

    //.pipe(browserSync.stream())

    /*.pipe(notify(function(file) {
            return 'Arquivo atualizado com sucesso!';
        }))*/
    /*.pipe(through(function () {
            this.emit("error", new Error("Something happend: Error message!"))
        }))*/

    // .pipe(gulp.dest("./css/min"))

    //.pipe(concatCss('bundle.css'))
    //.pipe(gulp.dest('./css'))
    .pipe(livereload());
});

gulp.task("js", function () {
  gulp
    .src("./src/js/**/*.js")
    .pipe(plumber())
    //  .pipe(uglify())
    .pipe(gulp.dest("./js"))
    .pipe(livereload());
});

gulp.task("watch", function () {
  /* browserSync.init({
         server: {
             baseDir: "."
         }
     });*/
  gulp.watch("./src/scss/**/*.scss", ["sass"]);
  gulp.watch(["*.html", "*.php"], ["html"]);
  gulp.watch("./src/js/**/*.js", ["js"]);
});

livereload.listen();

gulp.task("default", ["connect", "watch"]);
//gulp.task('default', ['watch']);
