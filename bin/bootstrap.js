var path   = require('path');
var merge  = require('lodash/object/merge');
var config = require('../config');

require('babel-register')(merge({}, config.get('babel_options'), {
    cache: false,
    resolveModuleSource: require('babel-resolver')(path.join('.', config.get('dir_src')))
}));

global = merge(global, config.get('globals'));

require('babel-polyfill');
require('isomorphic-fetch');