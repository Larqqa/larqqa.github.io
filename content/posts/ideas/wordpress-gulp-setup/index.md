---
title: Gulp & webpack setup for Wordpress development
date: "2021-01-05"
tags: ["Wordpress", "Gulp", "Webpack"]
---

Dynamically reloading development environments are a detrimental tool for my workflow. For Wordpress development I like using Gulp and Webpack, because Gulp has better tools for some stuff, where Webpack has brilliant tools for Javascript bundling. The setup essentially tracks all PHP files, JavaScript files, and style files (SCSS, CSS) and automatically refreshes
your browser with BrowserSync.

package.json
```json
{
  "name": "mediapankki",
  "version": "1.0.0",
  "description": "Reloader for php",
  "main": "gulpfile.js",
  "scripts": {
    "start": "env-cmd gulp",
    "build": "rm -rf build && env-cmd gulp build",
    "build:dev": "rm -rf build && gulp build",
    "build:styles": "env-cmd gulp styles",
    "build:scripts": "env-cmd gulp scripts",
    "build:svg": "env-cmd gulp svgs",
    "lint": "eslint .",
    "lint:fix": "eslint --fix ."
  },
  "author": "larqqa",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "^7.6.4",
    "@babel/plugin-proposal-class-properties": "^7.7.0",
    "@babel/plugin-transform-arrow-functions": "^7.8.3",
    "@babel/plugin-transform-classes": "^7.8.3",
    "@babel/plugin-transform-template-literals": "^7.8.3",
    "@babel/preset-env": "^7.6.3",
    "babel-eslint": "^10.0.3",
    "babel-loader": "^8.0.6",
    "browser-sync": "^2.26.7",
    "env-cmd": "^10.1.0",
    "eslint": "^6.7.2",
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^7.0.1",
    "gulp-cssnano": "^2.1.3",
    "gulp-notify": "^3.2.0",
    "gulp-plumber": "^1.2.1",
    "gulp-rename": "^1.4.0",
    "gulp-sass": "^4.0.2",
    "gulp-sourcemaps": "^2.6.5",
    "gulp-svgstore": "^7.0.1",
    "node-sass": "^4.13.1",
    "vinyl-named": "^1.1.0",
    "webpack": "^4.41.4",
    "webpack-stream": "^5.2.1"
  },
  "dependencies": {
    "lazysizes": "^5.2.0",
    "svgxuse": "^1.2.6"
  },
  "browserslist": [
    "> 1%",
    "IE 10"
  ]
}
```

.env
```
# This is a template for the .env file
NODE_ENV=development

# Replace this with your development machine ip
ENV_IP=http://localhost
```

gulpfile.js
```js
const fs            = require('fs');
const path          = require('path');
const browserSync   = require('browser-sync').create();
const gulp          = require('gulp');
const autoprefixer  = require('gulp-autoprefixer');
const cssnano       = require('gulp-cssnano');
const notify        = require('gulp-notify');
const plumber       = require('gulp-plumber');
const rename        = require('gulp-rename');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const svgstore      = require('gulp-svgstore');
const named         = require('vinyl-named');
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const IPADDRESS = process.env.ENV_IP ? process.env.ENV_IP : null;

const assetsFolder = './assets';
const buildFolder = './build';
const paths = {
  'base':  {
    'source': assetsFolder,
    'target': buildFolder
  },
  'scripts':  {
    'source': `${assetsFolder}/scripts`,
    'target': `${buildFolder}/scripts/`,
  },
  'styles':  {
    'source': `${assetsFolder}/styles`,
    'target': `${buildFolder}/styles/`,
  },
  'sprite':  {
    'source': `${assetsFolder}/svg`,
    'target': `${buildFolder}/`,
  },
}

/**
 * Handle errors
 * Using emit('end') to gracefully continue
 */
const onError = function(err) {
  notify.onError({
    title:    "Gulp",
    subtitle: "Failure!",
    message:  "Error: <%= error.message %>",
    sound:    "Beep"
  })(err);
  this.emit('end');
};

/**
 * Get all the directory paths inside of a given directory
 */
const getFolders = (dir) => {
  return fs.readdirSync(dir).filter(function(file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

/**
 * Minify JS files
 * New bundles are automatically created based on folders in /assets/js
 * The bundle names are the same as their parent folders name
 * ! New bundles need an index.js entry file to work !
 */
function scripts() {

  // Get entry files from js folders
  const entryPaths = getFolders(paths.scripts.source)
    .map(folder => `${paths.scripts.source}/${folder}/index.js`);

  // Extract the folder names from the paths, to be used as the bundle names
  const names = entryPaths.map(m => m.match('scripts/(.*)/index')[1]);

  let i = 0;
  return gulp.src(entryPaths)
    .pipe(plumber({errorHandler: onError}))
    .pipe(named(() => {
      i++;
      return names[i - 1];
    }))
    .pipe(webpackStream({
      config: require('./webpack.config.js')
    }, webpack, (err)=>false))
    .pipe(gulp.dest(paths.scripts.target))
    .pipe(browserSync.stream({match: '**/*.js'}));
}
gulp.task('scripts', scripts);

/* Minify and combine SCSS files */
function styles() {
  return gulp.src([`${paths.styles.source}/*.scss`, `${paths.styles.source}/*.css`])
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nested',
      precision: 8,
      includePaths: ['.'],
    }))
    .pipe(autoprefixer()) // Add browser specific CSS fixes
    .pipe(cssnano({safe: true})) // Minify CSS
    // Separate production sourcemaps to files
    .pipe(ENV === 'production' ? sourcemaps.write('.') : sourcemaps.write())
    .pipe(gulp.dest(paths.styles.target))
    .pipe(browserSync.stream({match: '**/*.css'}))
}
gulp.task('styles', styles);

/* Bundle SVG files */
function svgs () {
  return gulp.src(`${paths.sprite.source}/*.svg`)
    .pipe(plumber({errorHandler: onError}))
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(paths.sprite.target))
    .pipe(browserSync.stream());
}
gulp.task('svgs', svgs);

/* Default task for dev workflow */
function defaultTask() {
  browserSync.init({
    files: [
      '{inc,components,blocks,partials}/**/*.php',
      '*.php'
    ],
    proxy: IPADDRESS,
    snippetOptions: {
      whitelist: ['/wp-admin/admin-ajax.php'],
      blacklist: ['/wp-admin/**']
    }
  });

  // Watch scss, js & svg
  gulp.watch([`${paths.styles.source}/**/*.scss`, `${paths.styles.source}/**/*.css`]).on('change', styles);
  gulp.watch(`${paths.scripts.source}/**/*.js`).on('change', scripts);

  // Doesn't need to run always?
  // gulp.watch(`${paths.sprite.source}/*.svg`).on('change', svgs);
}
gulp.task('default', gulp.series(gulp.parallel(styles, scripts, svgs), defaultTask));

// Build task
gulp.task('build', gulp.parallel(styles, scripts, svgs));
```

webpack.config.js
```js
/**
 * Webpack config for bundling JavaScript files
 */
const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
module.exports = {
  mode: ENV,
  devtool: ENV === 'production' ? 'false' : 'inline-source-map',
  output: {
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-arrow-functions',
            '@babel/plugin-transform-classes',
            '@babel/plugin-transform-template-literals',
          ]
        },
      },
    ],
  },
};
```