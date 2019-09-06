import {task, parallel} from 'gulp';

task('watch', parallel(
  'copy:watch',
  'svgmin:watch',
  'svgo:watch',
  'pug:watch',
  'webpack:watch',
  'sass:watch'
));
