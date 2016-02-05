import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import configIsomorphicTools from '../isomorphic-tools.config';
import config from '../config';

let paths  = config.get('utils_paths');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(configIsomorphicTools)
    .development(config.get('env') !== 'production')
    .server(paths.src(), function() {
        require(paths.src('dev-server'));
    });