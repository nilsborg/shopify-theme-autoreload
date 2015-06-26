var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var shell       = require('gulp-shell');
var filter      = require('gulp-filter');
var watch       = require('gulp-watch');

var minimist    = require('minimist');

var knownOptions = {
  string: 'url',
  default: { url: process.env.NODE_ENV }
};

var options = minimist(process.argv.slice(2), knownOptions);

function isChanged(file) {
    return file.event === 'change';
}

var filterChanged = filter(isChanged);

gulp.task('serve', function() {
  browserSync.init({
    proxy: options.url,
    browser: "google chrome",
    injectChanges: false, // cause of css being served from cdn
  });

  gulp.watch("assets/*.scss", ['sass']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("assets/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("assets/"))
    .pipe(shell([
      'theme upload <%= f(file.path) %>'
    ], {
      templateData: {
        f: function (s) {
          // cut away absolute path of working dir for 'theme' cmd to work
          return s.replace(process.cwd() + '/', '')
        }
      }
    }))
    .pipe(browserSync.stream());
});

gulp.task('liquid', function() {
  return gulp.src('**/*.liquid')
    .pipe(watch('**/*.liquid'))
    .pipe(filterChanged)
    .pipe(shell([
      'theme upload <%= f(file.path) %>'
    ], {
      templateData: {
        f: function (s) {
          // cut away absolute path of working dir for 'theme' cmd to work
          return s.replace(process.cwd() + '/', '')
        }
      }
    }))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve', 'liquid']);
