'use strict';

var open = require('open');
var through = require('through2');
var gutil = require('gulp-util');

var colors = gutil.colors;

var PLUGIN_NAME = 'gulp-open';

module.exports = function(opts) {

  opts = opts || {};

  return through.obj(function(file, enc, cb) {

    if (file.isNull() && !opts.uri) {
      return cb(new gutil.PluginError(PLUGIN_NAME, 'URI is missing or incorrect'));
    }

    if (file.path && !opts.uri)  {
      opts.uri = file.path;
    }

    if (opts.app) {
      gutil.log(colors.blue('Opening', colors.green(opts.uri), 'using the app',
        colors.green(opts.app)));
      // Open with the given app
      return open(opts.uri, opts.app);

    }
    gutil.log(colors.blue('Opening', colors.green(opts.uri), 'using the',
      colors.green('default OS app')));
    // Open with the default app defined by the os
    open(opts.uri);

  });
};
