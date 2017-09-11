var browserSync  = require('browser-sync');
var watchify     = require('watchify');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var gulpSequence = require('gulp-sequence');
var processhtml  = require('gulp-minify-html');
var sass         = require('gulp-sass');
var watch        = require('gulp-watch');
var minifycss    = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var streamify    = require('gulp-streamify');
var mustache     = require("gulp-mustache-plus");
var prod         = gutil.env.prod;

var onError = function(err) {
  console.log(err.message);
  this.emit('end');
};

// bundling js with browserify and watchify
var b = watchify(browserify('./src/js/main', {
  cache: {},
  packageCache: {},
  fullPaths: true
}));

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    .on('error', onError)
    .pipe(source('bundle.js'))
    .pipe(prod ? streamify(uglify()) : gutil.noop())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

// html
gulp.task('html', function() {
  return gulp.src('./src/templates/**/*')
    .pipe(processhtml())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

// sass
gulp.task('sass', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .on('error', onError)
    .pipe(prod ? minifycss() : gutil.noop())
    .pipe(gulp.dest('./build/stylesheets'))
    .pipe(browserSync.stream());
});
// ==== bootstratp
gulp.task('bootstrap',function(){
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css').pipe(gulp.dest('./build/stylesheets/')).pipe(browserSync.stream());
    //Javascript de Bootstrap
    gulp.src("./node_modules/bootstrap/dist/js/*.js").pipe(gulp.dest('./build/js/')).pipe(browserSync.stream());
    //JQuery
    gulp.src("./node_modules/jquery/dist/jquery.min.js").pipe(gulp.dest('./build/js/')).pipe(browserSync.stream());
});
var browserSync  = require('browser-sync');
var watchify     = require('watchify');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var gulpSequence = require('gulp-sequence');
var processhtml  = require('gulp-minify-html');
var sass         = require('gulp-sass');
var watch        = require('gulp-watch');
var minifycss    = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var streamify    = require('gulp-streamify');
var mustache     = require("gulp-mustache-plus");
var prod         = gutil.env.prod;

var onError = function(err) {
  console.log(err.message);
  this.emit('end');
};

// bundling js with browserify and watchify
var b = watchify(browserify('./src/js/main', {
  cache: {},
  packageCache: {},
  fullPaths: true
}));

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    .on('error', onError)
    .pipe(source('bundle.js'))
    .pipe(prod ? streamify(uglify()) : gutil.noop())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

// html
gulp.task('html', function() {
  return gulp.src('./src/templates/**/*')
    .pipe(processhtml())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

// sass
gulp.task('sass', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .on('error', onError)
    .pipe(prod ? minifycss() : gutil.noop())
    .pipe(gulp.dest('./build/stylesheets'))
    .pipe(browserSync.stream());
});
// ==== bootstratp
gulp.task('bootstrap',function(){
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css').pipe(gulp.dest('./build/stylesheets/')).pipe(browserSync.stream());
    //Javascript de Bootstrap
    gulp.src("./node_modules/bootstrap/dist/js/*.js").pipe(gulp.dest('./build/js/')).pipe(browserSync.stream());
    //JQuery
    gulp.src("./node_modules/jquery/dist/jquery.min.js").pipe(gulp.dest('./build/js/')).pipe(browserSync.stream());
});
// mustache
gulp.task('mustache', function() {
  gulp.src("./src/mustache/*.mustache")
    .pipe(mustache('./src/mustache/data.json',{},{
        // partials        
        header : './src/mustache/layout/header.mustache',
        header2 : './src/mustache/layout/header2.mustache',
        footer : './src/mustache/layout/footer.mustache',
        tickets: './src/mustache/layout/tickets.mustache',
        chats: './src/mustache/layout/chats.mustache',
        usuarios: './src/mustache/layout/usuarios.mustache',
        mensajesChats: './src/mustache/layout/mensajesChats.mustache',
    }))
    .on('error', onError)
    .pipe(gulp.dest('./src/templates/'))  
    //JSON
    gulp.src('./src/mustache/data.json').pipe(gulp.dest('./build/js/')).pipe(browserSync.stream());
});

// browser sync server for live reload
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch('./src/templates/**/*', ['html']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/mustache/**/*.mustache', ['mustache']);
});

// use gulp-sequence to finish building html, sass and js before first page load
gulp.task('default', gulpSequence(['bootstrap','html', 'sass', 'mustache', 'js'], 'serve'));

// browser sync server for live reload
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch('./src/templates/**/*', ['html']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/mustache/**/*.mustache', ['mustache']);
});

// use gulp-sequence to finish building html, sass and js before first page load
gulp.task('default', gulpSequence(['bootstrap','html', 'sass', 'mustache', 'js'], 'serve'));