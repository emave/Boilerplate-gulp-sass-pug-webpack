import {task, series} from 'gulp';

require('./gulp/tasks/clean');
require('./gulp/tasks/copy');
require('./gulp/tasks/critical');
require('./gulp/tasks/pug');
require('./gulp/tasks/sass');
require('./gulp/tasks/svgo');
require('./gulp/tasks/webpack');
require('./gulp/tasks/server');
require('./gulp/tasks/build');
require('./gulp/tasks/watch');

task('default', series(
  'build:dev',
  'server',
  'watch'
));
