import gulp from 'gulp';
import del from 'del';
import rename from 'gulp-rename';
import sourcemap from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import twig from 'gulp-twig';
import htmlmin from 'gulp-htmlmin';
import svgmin from 'gulp-svgmin';
import svgsprite from 'gulp-svg-sprite';
import inject from 'gulp-inject';
import imagemin from 'gulp-imagemin';

const sync = browserSync.create();

/* clear */
const clear = () => {
  return del('./build/');
};



/* inline svg */
const inlineSvg = () => {
  const svgs = gulp.src('./src/img/sprite/*.svg')
    .pipe(svgmin())
    .pipe(svgsprite({
      mode: {
        symbol:{
          dest: '.',
          example: false,
          sprite: 'sprite.svg',
        },
      },
      shape: {
        transform: ['svgo'],
      },
     }))
    .pipe(gulp.dest('build/'));

  return svgs;
  // const fileContents = (filePath, file) => {
  //   return file.contents.toString();
  // };

  // return gulp.src('./build/*.html')
  //   .pipe(inject(svgs, { transform: fileContents }))
  //   .pipe(sync.stream());
};

/* twig */
const html = () => {
  return gulp.src('./src/*.twig')
    .pipe(twig())
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./build/'))
    .pipe(sync.stream());
};

/* default */
export default gulp.series(
  clear,
  html,
  inlineSvg,
);
