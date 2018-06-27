'use strict';

const beeper = require('beeper');
const chalk = require('chalk');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const log = require('fancy-log');
const prettier = require('gulp-prettier-plugin');
const sasslint = require('gulp-stylelint');
const { spawn } = require('child_process');

const paths = {
  SRC_JS_DIR: 'src/js/',
  SASS_DIR: 'src/sass/',
  IGNORE: ['!**/.#*', '!**/flycheck_*'],
  init() {
    this.SRC_JS = [`${this.SRC_JS_DIR}**/*.js`].concat(this.IGNORE);
    this.ALL_JS = [`${this.SRC_JS_DIR}**/*.js`, '*.js', '.*.js'].concat(
      this.IGNORE,
    );
    this.SASS = [`${this.SASS_DIR}**/*.scss`].concat(this.IGNORE);
    return this;
  },
}.init();

// Try to ensure that all processes are killed on exit
const spawned = [];
process.on('exit', () => {
  spawned.forEach(pcs => {
    pcs.kill();
  });
});

const onError = function(err) {
  log.error(chalk.red(err.message));
  beeper();
  this.emit('end');
};

// Execute a command, logging output live while process runs
const spawnTask = function(command, args, cb) {
  const task = spawn(command, args, { stdio: 'inherit' }).on('error', err => {
    beeper();
    if (cb) {
      return cb(err);
    }
    return onError(err);
  });
  if (cb) {
    task.on('exit', cb);
  }
  spawned.push(task);
};

const eslintTask = (src, failOnError, shouldLog) => {
  if (shouldLog) {
    const cmd = `eslint ${src}`;
    log('Running', `'${chalk.cyan(cmd)}'...`);
  }
  const stream = gulp
    .src(src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  if (!failOnError) {
    stream.on('error', onError);
  }
  return stream;
};

const prettierTask = (src, shouldLog) => {
  if (shouldLog) {
    const cmd = `prettier ${src}`;
    log('Running', `'${chalk.cyan(cmd)}'...`);
  }
  return gulp
    .src(src, { base: './' })
    .pipe(prettier({ singleQuote: true, trailingComma: 'all' }))
    .pipe(gulp.dest('./'))
    .on('error', onError);
};

const sasslintTask = (src, failOnError, shouldLog) => {
  if (shouldLog) {
    const cmd = `sasslint ${src}`;
    log('Running', `'${chalk.cyan(cmd)}'...`);
  }
  const stream = gulp.src(src).pipe(
    sasslint({
      reporters: [{ formatter: 'string', console: true }],
      failAfterError: failOnError,
    }),
  );
  if (!failOnError) {
    stream.on('error', onError);
  }
  return stream;
};

gulp.task('prettier-js', () => prettierTask(paths.ALL_JS));
gulp.task('prettier-scss', () => prettierTask(paths.SASS));
gulp.task('prettier', gulp.parallel('prettier-js', 'prettier-scss'));

gulp.task(
  'eslint',
  gulp.series('prettier-js', () => eslintTask(paths.ALL_JS, true)),
);

gulp.task('eslint-nofail', () => eslintTask(paths.ALL_JS));

gulp.task(
  'sasslint',
  gulp.series('prettier-scss', () => sasslintTask(paths.SASS, true)),
);

gulp.task('sasslint-nofail', () => sasslintTask(paths.SASS));

gulp.task(
  'watch',
  gulp.parallel(cb => {
    // lint scss on changes
    gulp.watch(paths.SASS).on('all', (event, filepath) => {
      if (event === 'add' || event === 'change') {
        sasslintTask(filepath, false, true);
      }
    });

    // lint all scss when rules change
    gulp.watch('**/.stylelintrc.yml', gulp.parallel('sasslint-nofail'));

    // lint js on changes
    gulp.watch(paths.ALL_JS).on('all', (event, filepath) => {
      if (event === 'add' || event === 'change') {
        eslintTask(filepath, false, true);
      }
    });

    // lint all js when rules change
    gulp.watch(
      ['**/.eslintrc.yml', '**/.flowconfig'],
      gulp.parallel('eslint-nofail'),
    );

    cb();
  }),
);

gulp.task(
  'serve',
  gulp.parallel('watch', cb => {
    spawnTask(`./node_modules/.bin/parcel`, ['./src/index.html'], cb);
  }),
);

gulp.task('default', gulp.parallel('sasslint', 'eslint'));

// Same as default task, but also watches for changes
// (tasks are listed individually because "watch" already runs tests once)
gulp.task('dev', gulp.series(gulp.parallel('eslint', 'sasslint'), 'watch'));
