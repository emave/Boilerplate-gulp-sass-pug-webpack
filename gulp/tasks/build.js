import {task, series} from 'gulp';

task('build', series(
  'clean',
  'svgo',
  'sass',
  'pug',
  'webpack',
  'copy',
  'critical')
);

task('build:dev', series(
  'clean',
  'svgo',
  'sass',
  'pug',
  'webpack',
  'copy')
);
