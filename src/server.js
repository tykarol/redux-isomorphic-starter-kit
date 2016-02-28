import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import { reduxReactRouter } from 'redux-router/server';
import createHistory from 'history/lib/createMemoryHistory';
import cookie from 'cookie';
import { Root } from 'containers';
import configureStore from 'stores/configureStore';
import routes from 'routes';
import { loggedUserTokenSave } from 'actions';
import { Html } from 'helpers';
import config from '../config';

const app = new Express();
const port = 8080;

// This is only for mocked api, you can simple delete this
app.all('/mock-api/*', (req, res, next) => {
    // eslint-disable-next-line no-param-reassign
    req.method = 'GET';
    next();
});

app.use(Express.static(config.get('dir_dist')));

function handleRender(req, res) {
    // Send the rendered page back to the client
    match({ routes, location: req.url }, (error, redirectLocation, routerState) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (!routerState) {
            res.status(404).send('Not found');
        } else {
            const history = reduxReactRouter({ routes, createHistory });
            const store = configureStore(history, { router: routerState });

            const token = cookie.parse(req.headers.cookie || '').token;
            if (token !== null) {
                store.dispatch(loggedUserTokenSave(token));
            }

            const htmlProps = {
                store,
                assets: webpackIsomorphicTools.assets(),
                component: <Root store={store} />
            };

            const html = ReactDOM.renderToString(
                            <Html {...htmlProps} />
                        );

            res.send(`<!doctype html>${html}`);
        }
    });
}

app.use(handleRender);

app.listen(port, (error) => {
    if (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    } else {
        // eslint-disable-next-line no-console
        console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    }
});
