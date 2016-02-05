import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Html } from 'helpers';
import webpackConfig from '../webpack.config';
import config from '../config';

const host = config.get('webpack_host');
const port = config.get('webpack_port');

let app  = new express();
let compiler = webpack(webpackConfig);

app.use(historyApiFallback());

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}));

app.use(webpackHotMiddleware(compiler));

// This is only for mocked api, you can simple delete this
app.all('/mock-api/*', function(req, res, next) {
    req.method = 'GET';
    next();
});

app.use(express.static(config.get('dir_dist')));

app.use(handleRender);

function handleRender(req, res) {
    if (__DEV__) {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
    }

    const html = ReactDOM.renderToString(
                    <Html assets={webpackIsomorphicTools.assets()} />
                );

    res.send(`<!doctype html>${html}`);
}

app.listen(port, host, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> Listening on %s:%s. Open up http://%s:%s/ in your browser.", host, port, host, port);
    }
});
