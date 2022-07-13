import gulp from 'gulp';
import gulpImage from 'gulp-image';
import gulpConcat from 'gulp-concat'
import gulpHtmlMin from 'gulp-htmlmin'
import gulpAutoprefixes from 'gulp-autoprefixer'
import gulpCleanCSS from 'gulp-clean-css'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import gulpSvgSprite from 'gulp-svg-sprite'
import gulpUglifyBuild from 'gulp-uglify-es'
import gulpBabel from 'gulp-babel'
import gulpNotify from 'gulp-notify'
import gulpSourcemaps from 'gulp-sourcemaps'
import gulpDel from 'del'
import gulpBrowserSync from 'browser-sync'
import gulpwebpack from 'webpack';
import gulpwebpackStream from 'webpack-stream';

const { src, dest, series, watch } = gulp
const concat = gulpConcat
const htmlMin = gulpHtmlMin
const autoprefixes = gulpAutoprefixes
const cleanCSS = gulpCleanCSS
const sass = gulpSass(dartSass)
const svgSprite = gulpSvgSprite
const image = gulpImage
const uglify = gulpUglifyBuild.default
const babel = gulpBabel
const notify = gulpNotify
const sourcemaps = gulpSourcemaps
const del = gulpDel
const browserSync = gulpBrowserSync.create()
const webpack = gulpwebpack
const webpackStream = gulpwebpackStream

export const clean = () => {
  return del(['dist'])
}

const resources = () => {
  return src([
    'src/resources/**',
    'src/**/*.html'
  ])
    .pipe(dest('dist'))
}

export const buildStyle = () => {
  return src('src/style/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', notify.onError()))
    .pipe(autoprefixes({
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css/'))
    .pipe(browserSync.stream())
}

function buildStyles() {
  return src('src/style/**/*.scss')
    .pipe(sass().on('error', notify.onError()))
    .pipe(autoprefixes({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('dist/css'))
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
}

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/img'))
}

const script = () => {
  return src([
    // 'src/js/components/**/*.js',
    'src/js/main.js'
  ])
    .pipe(webpackStream({
      output: {
        filename: 'app.js',
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env']
                ]
              }
            }
          }
        ]
      }
    }))
    .pipe(sourcemaps.init())
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    // .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const scripts = () => {
  return src([
    // 'src/js/components/**/*.js',
    'src/js/main.js'
  ])
    .pipe(webpackStream({
      output: {
        filename: 'app.js',
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      }
    }))
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    .pipe(concat('app.js'))
    .pipe(uglify({
      toplevel: true
    }).on('error', notify.onError()))
    .pipe(dest('dist'))
}

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img/*.svg',
    'src/img/**/*.jpeg'
  ])
    .pipe(image())
    .pipe(dest('dist/img'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/**/*.html', htmlMinify)
watch('src/style/**/*.scss', buildStyle)
watch('src/img/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', script)
watch('src/js/**/*.js', scripts)
watch(['src/resources/**', 'src/**/*.html'], resources)

export { watchFiles as watch };

const def = gulp.series(clean, resources, htmlMinify, script, buildStyle, images, svgSprites, watchFiles)
export default def;

const prod = gulp.series(clean, resources, htmlMinify, buildStyles, scripts, images, svgSprites)
export { prod };

const dev = gulp.series(clean, resources, script, buildStyle, images, svgSprites, watchFiles)
export { dev };
