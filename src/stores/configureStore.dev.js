import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { DevTools } from 'containers';
import api from 'middleware/api';
import rootReducer from 'reducers';

export default function configureStore(history, initialState) {
    const store = compose(
        applyMiddleware(thunk, api),
        history,
        applyMiddleware(createLogger()),
        DevTools.instrument()
    )(createStore)(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('reducers', () => {
            const nextRootReducer = require('reducers');
            store.replaceReducer(nextRootReducer);
        })
    }

    return store;
};
