import gulp from 'gulp';
import del from 'del';
import rename from 'gulp-rename';
import sourcemap from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import twig from 'gulp-twig';
import htmlmin from 'gulp-htmlmin';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
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
    .pipe(svgmin({
      removeXMLNS: true,
      removeViewBox: false,
      removeDimensions: true,
    }))
    .pipe(svgstore({ inlineSvg: true }));

  const fileContents = (filePath, file) => {
    return file.contents.toString();
  };

  return gulp.src('./build/*.html')
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest('build/'))
    .pipe(sync.stream());
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
