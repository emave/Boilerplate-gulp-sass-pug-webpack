import gulp from 'gulp';
import config from '../config';

const critical = require('critical').stream;

gulp.task('critical', (cb) => {
  gulp.src([config.dest.html + '/*.html'])
    .pipe(critical({
      base: config.dest.html,
      inline: true,
      minify: true,
      css: [config.dest.css + '/app.css'],
    }))
    .pipe(gulp.dest(config.dest.html + ''));
  cb();
});


gulp.task('critical:watch', (cb) => {
  gulp.watch(`${config.dest.html}/**/*.html`, gulp.series('critical'));
  cb();
});
