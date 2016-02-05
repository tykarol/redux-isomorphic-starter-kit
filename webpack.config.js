import path from 'path';
import webpack from 'webpack';
import postcssImport from 'postcss-import';
import postcssAutoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

import config from './config';
import configIsomorphicTools from './isomorphic-tools.config'

let webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(configIsomorphicTools)
    .development(config.get('env') !== 'production');

let paths  = config.get('utils_paths');

let CSS_CLASS_NAME, FONT_FILE_NAME, IMAGE_FILE_NAME;
if(config.get('env') !== 'production') {
    CSS_CLASS_NAME = '[name]__[local]___[hash:base64:5]';
    FONT_FILE_NAME  = '[path][name].[ext]?[hash:base64:5]';
    IMAGE_FILE_NAME = '[path][name].[ext]?[hash:base64:5]';
}

let webpackConfig = {
    context: paths.src(),
    entry: {
        app: [
            './app'
        ]
    },
    output: {
        path: paths.dist(),
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[id].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: config.get('babel_options')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', [
                    loader('css-loader', {
                        sourceMap: true,
                        modules: true,
                        localIdentName: CSS_CLASS_NAME || '[hash:base64:8]'
                    }),
                    'postcss-loader',
                    loader('sass-loader', {
                        sourceMap: true
                    })
                ])
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', [
                    loader('css-loader', {
                        sourceMap: true,
                        modules: true,
                        localIdentName: CSS_CLASS_NAME || '[hash:base64:8]'
                    }),
                    'postcss-loader'
                ])
            },
            {
                test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
                loader: loader('file-loader', {
                    name: 'fonts/'+(FONT_FILE_NAME || '[hash:base64:8].[ext]')
                })
            },
            {
                test: webpackIsomorphicToolsPlugin.regular_expression('images'),
                loader: loader('url-loader', {
                    limit: 10000,
                    name: 'images/'+(IMAGE_FILE_NAME || '[hash:base64:8].[ext]')
                })
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', path.join('.', config.get('dir_src'))],
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.DefinePlugin(config.get('globals')),
        new CleanPlugin([
            paths.dist('fonts'),
            paths.dist('images'),
            paths.dist('scripts'),
            paths.dist('styles'),
            paths.dist('assets.json'),
            paths.dist('stats.json'),
            paths.dist('index.html')
        ]),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('styles/[name].css', {
            disable: config.get('env') !== 'production'
        }),
        webpackIsomorphicToolsPlugin
    ],
    postcss: function (webpack) {
        return {
            defaults: [
                postcssAutoprefixer({
                    browsers: ['last 2 versions']
                })
            ]
        };
    }
};

if (config.get('env') === 'production') {
    webpackConfig.plugins = webpackConfig.plugins || [];
    webpackConfig.plugins.unshift(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress : {
                'unused'   : true,
                'dead_code': true
            }
        })
    );
} else {
    webpackConfig.devtool = 'source-map';
    // When spurce map for css is active then the url() must be absolute path because is used blob for serve css
    webpackConfig.output.publicPath = config.get('webpack_public_path');
    
    // hot
    webpackConfig.entry['app'].unshift(
        'webpack-hot-middleware/client?path='+config.get('webpack_public_path')+'__webpack_hmr'
    );

    // react hot
    webpackConfig.module.loaders[0].query = webpackConfig.module.loaders[0].query || {};
    webpackConfig.module.loaders[0].query.plugins = webpackConfig.module.loaders[0].query.plugins || [];
    webpackConfig.module.loaders[0].query.plugins.push([
        'react-transform', 
        {
            transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
            }]
        }
    ]);

    webpackConfig.plugins = webpackConfig.plugins || [];
    webpackConfig.plugins.unshift(
        new webpack.HotModuleReplacementPlugin()
        //, new webpack.NoErrorsPlugin()
    );
}

function loader(loaderName, loaderQuery) {
    return loaderName + (loaderQuery ? ('?' + JSON.stringify(loaderQuery)) : '');
}

console.info('==> ENV = %s', config.get('env'));

export default webpackConfig;