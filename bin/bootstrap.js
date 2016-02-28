const path = require('path');
const merge = require('lodash/merge');
const config = require('../config');

require('babel-register')(merge({}, config.get('babel_options'), {
    cache: false,
    resolveModuleSource: require('babel-resolver')(path.join('.', config.get('dir_src')))
}));

global = merge(global, config.get('globals'));

require('babel-polyfill');
require('isomorphic-fetch');
