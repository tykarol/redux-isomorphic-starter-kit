/**************************************

Warning: In this file use only ES5!

**************************************/

var path = require('path');
var argv = require('yargs').argv;

var config = new Map();

// ----------------------
// User Configuration
// ----------------------
config.set('dir_src',  'src');
config.set('dir_dist', 'public');

config.set('webpack_host', 'localhost');
config.set('webpack_port', 3000);

config.set('api_uri', '/mock-api/'); // Simple change address to your full api url

/**************************************

All Internal Configuration Below
Edit at Your Own Risk

**************************************/

// ----------------------
// Environment
// ----------------------
config.set('env', process.env.NODE_ENV);
config.set('globals', {
    'process.env'  : {
        'NODE_ENV' : JSON.stringify(config.get('env'))
    },
    'NODE_ENV'     : config.get('env'),
    '__DEV__'      : config.get('env') === 'development',
    '__PROD__'     : config.get('env') === 'production',
    '__API_URI__'  : JSON.stringify(argv.api_uri || config.get('api_uri'))
});

// ----------------------
// Webpack
// ----------------------
config.set('webpack_public_path',
  'http://' + config.get('webpack_host') + ':' + config.get('webpack_port') + '/'
);

// ----------------------
// Babel
// ----------------------
config.set('babel_options', {
    babelrc: false,
    presets: ['es2015', 'stage-0', 'react']
});

// ----------------------
// Project
// ----------------------
config.set('path_project', path.resolve(__dirname, '.'));

// ----------------------
// Utilities
// ----------------------
var paths = (function() {
    var base    = [config.get('path_project')];
    var resolve = path.resolve;

    var project = function() {
        var args = Array.prototype.slice.call(arguments);
        return resolve.apply(resolve, base.concat(args));
    };

    return {
        project : project,
        src     : project.bind(null, config.get('dir_src')),
        dist    : project.bind(null, config.get('dir_dist'))
    };
})();

config.set('utils_paths', paths);

module.exports = config;