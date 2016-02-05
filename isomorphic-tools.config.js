var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

var config = require('./config');
var paths  = config.get('utils_paths');

module.exports = {
    webpack_assets_file_path: paths.dist() + '/assets.json',
    webpack_stats_file_path: paths.dist() + '/stats.json',
    assets: {
        images: {
            extensions: ['png', 'jpg', 'jpeg', 'gif', 'ico', 'svg'],
            parser: WebpackIsomorphicToolsPlugin.url_loader_parser
        },
        fonts: {
            extensions: ['woff', 'woff2', 'ttf', 'eot'],
            parser: WebpackIsomorphicToolsPlugin.url_loader_parser
        },
        style_modules: {
            extensions: ['css', 'scss'],
            filter: function(module, regex, options, log) {
                if (options.development) {
                    return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log)
                }

                return regex.test(module.name);
            },
            path: function(module, options, log) {
                if (options.development) {
                    return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
                }

                return module.name.replace(/^\.\.\/~\//, '../node_modules/');;
            },
            parser: function(module, options, log) {
                if (options.development) {
                    return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
                }

                return module.source;
            }
        }
    }
};