import {
    LOGIN_USER_TOKEN_SAVE,
    LOGIN_USER_TOKEN_CLEAR,
    LOGGED_USER_REQUEST,
    LOGGED_USER_SUCCESS,
    LOGGED_USER_FAILURE
} from 'actions';

const initialState = {
    auth: false,
    token: null,
    profile: null,
    entities: {},
    isFetching: false
};

function isFetching(state = initialState.isFetching, action) {
    switch (action.type) {
        case LOGGED_USER_REQUEST: {
            return true;
        }
        case LOGGED_USER_SUCCESS:
        case LOGGED_USER_FAILURE: {
            return false;
        }
        default:
            return state;
    }
}

function user(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER_TOKEN_SAVE: {
            return {
                ...initialState,
                auth: !!action.token,
                token: action.token
            };
        }
        case LOGIN_USER_TOKEN_CLEAR: {
            return initialState;
        }
        case LOGGED_USER_SUCCESS: {
            if (action.response && action.response.result) {
                return {
                    ...state,
                    isFetching: isFetching(state.isFetching, action),
                    profile: action.response.result || null
                };
            }

            return {
                ...state,
                isFetching: isFetching(state.isFetching, action)
            };
        }
        default:
            return {
                ...state,
                isFetching: isFetching(state.isFetching, action)
            };
    }
}

export default user;
