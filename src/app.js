import React from 'react';
import ReactDOM from 'react-dom';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Root } from 'containers';
import configureStore from 'stores/configureStore';
import { loggedUserTokenSave } from 'actions';
import routes from 'routes';
import { Cookie } from 'helpers';

injectTapEventPlugin();

const history = reduxReactRouter({ routes, createHistory });
const store = configureStore(history, window.__INITIAL_STATE__);

const token = Cookie.get('token');
if (token !== null) {
    store.dispatch(loggedUserTokenSave(token));
}

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
)