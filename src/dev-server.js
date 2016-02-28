import Express from 'express';
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

const app = new Express();
const compiler = webpack(webpackConfig);

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
app.all('/mock-api/*', (req, res, next) => {
    // eslint-disable-next-line no-param-reassign
    req.method = 'GET';
    next();
});

app.use(Express.static(config.get('dir_dist')));

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

app.use(handleRender);

app.listen(port, host, (error) => {
    if (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    } else {
        // eslint-disable-next-line no-console
        console.info('==> Listening on %s:%s. Open up http://%s:%s/ in your browser.', host, port, host, port);
    }
});
