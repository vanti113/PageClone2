import gulp from "gulp";
import gPug from "gulp-pug";
import del from "del";
import gulpSass from "gulp-sass";
import csso from "gulp-csso";
import autoP from "gulp-autoprefixer";
import bro from "gulp-bro";
import babelify from "babelify";
import ws from "gulp-webserver";
import ghPages from "gulp-gh-pages";
import image from "gulp-image";

gulpSass.compiler = require("node-sass");

const routes = {
  pug: {
    src: "src/templates/index.pug",
    dest: "build",
    watch: "src/templates/**/*.pug",
  },
  scss: {
    src: "src/scss/style.scss",
    dest: "build/css",
    watch: "src/scss/**/*.scss",
  },
  js: {
    src: "src/js/**/index.js",
    dest: "build/js",
    watch: "src/js/**/*.js",
  },
  image: {
    src: "src/images/**/*",
    dest: "build/image",
  },
};

const pug = () =>
  gulp.src(routes.pug.src).pipe(gPug()).pipe(gulp.dest(routes.pug.dest));
const scss = () =>
  gulp
    .src(routes.scss.src)
    .pipe(gulpSass().on("error", gulpSass.logError))
    .pipe(autoP())
    .pipe(csso())
    .pipe(gulp.dest(routes.scss.dest));

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({
            presets: ["@babel/env"],
          }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dest));

const img = () =>
  gulp.src(routes.image.src).pipe(image()).pipe(gulp.dest(routes.image.dest));

const web = () =>
  gulp.src("build").pipe(
    ws({
      livereload: true,
      open: true,
    })
  );

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.scss.watch, scss);
  gulp.watch(routes.js.watch, js);
};

const upload = () => gulp.src("build/**/*").pipe(ghPages());

const clean = () => del("build");

const assets = gulp.series([pug, scss, js, img]);

export const build = gulp.series([clean, assets]);
export const dev = gulp.series([web, watch]);
export const deploy = gulp.series([build, upload]);
