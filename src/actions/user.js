import { CALL_API } from 'middleware/api';
import { Schemas } from 'middleware/schema';
import { Cookie } from 'helpers';

export const LOGIN_USER_TOKEN_SAVE = 'LOGIN_USER_TOKEN_SAVE';
export const LOGIN_USER_TOKEN_CLEAR = 'LOGIN_USER_TOKEN_CLEAR';

export function loggedUserTokenSave(token) {
    const expires = new Date(Date.now() + (1000 * 60 * 60 * 24 * 30));
    Cookie.set('token', token, { expires });

    return {
        type: LOGIN_USER_TOKEN_SAVE,
        token
    };
}

function loggedUserTokenClear() {
    Cookie.remove('token');

    return {
        type: LOGIN_USER_TOKEN_CLEAR
    };
}

export const LOGGED_USER_REQUEST = 'LOGGED_USER_REQUEST';
export const LOGGED_USER_SUCCESS = 'LOGGED_USER_SUCCESS';
export const LOGGED_USER_FAILURE = 'LOGGED_USER_FAILURE';

function fetchLoggedUser() {
    return {
        [CALL_API]: {
            types: [LOGGED_USER_REQUEST, LOGGED_USER_SUCCESS, LOGGED_USER_FAILURE],
            endpoint: 'me',
            schema: Schemas.LOGGED_USER
        }
    };
}

export function loadLoggedUser(requiredFields = []) {
    return (dispatch, getState) => {
        const { user: { profile } } = getState();

        if (profile && requiredFields.every(key => profile.hasOwnProperty(key))) {
            return null;
        }

        return dispatch(fetchLoggedUser()).then(
                action => action,
                error => {
                    dispatch(loggedUserTokenClear());
                    return error;
                }
            );
    };
}

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

/**
 * Get user token
 * @param  {object} data Object with username and password
 * @return {action}
 */
function fetchLoginUser(data) {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);

    return {
        [CALL_API]: {
            types: [LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE],
            endpoint: 'login_check',
            schema: {},
            options: {
                method: 'POST',
                body: formData
            }
        }
    };
}

export function loginUser(data) {
    return (dispatch) =>
        dispatch(fetchLoginUser(data)).then(
                action => {
                    if (action.type === LOGIN_USER_SUCCESS) {
                        dispatch(loggedUserTokenSave(action.response.result.token));
                        dispatch(fetchLoggedUser());
                    } else {
                        dispatch(loggedUserTokenClear());
                    }

                    return action;
                },
                error => {
                    dispatch(loggedUserTokenClear());
                    return error;
                }
            );
}

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';

function fetchLogoutUser() {
    return {
        [CALL_API]: {
            types: [LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE],
            endpoint: 'logout',
            schema: {}
        }
    };
}

export function logoutUser() {
    return (dispatch) =>
        dispatch(fetchLogoutUser()).then(
                action => {
                    dispatch(loggedUserTokenClear());
                    return action;
                },
                error => {
                    dispatch(loggedUserTokenClear());
                    return error;
                }
            );
}
