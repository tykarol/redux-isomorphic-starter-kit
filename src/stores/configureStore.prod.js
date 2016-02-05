import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import api from 'middleware/api';
import rootReducer from 'reducers';

export default function configureStore(history, initialState) {
    return compose(
        applyMiddleware(thunk, api),
        history
    )(createStore)(rootReducer, initialState);
};
