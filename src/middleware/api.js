import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import merge from 'lodash/merge';

function callApi(endpoint, schema, options) {
    const fullUrl = `${__API_URI__}${endpoint}.json`;

    return fetch(fullUrl, options)
        .then(response =>
            response.json().then(json => ({ json, response }))
        ).then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }

            const camelizedJson = camelizeKeys(json);

            return Object.assign({},
                normalize(camelizedJson, schema)
            );
        });
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('CALL_API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let { endpoint, options } = callAPI;
    const { schema, types } = callAPI;

    const { user: { token } } = store.getState();
    if (token && typeof token === 'string') {
        options = merge({}, options, {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }
    if (!schema) {
        throw new Error('Specify one of the exported Schemas.');
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    }

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    return callApi(endpoint, schema, options).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            status: 'error',
            message: error.message || 'Something bad happened'
        }))
    );
};
