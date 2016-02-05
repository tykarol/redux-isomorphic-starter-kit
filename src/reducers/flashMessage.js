import { RESET_FLASH_MESSAGE } from 'actions';

var initialState = {
    status: null,
    message: null
};

// Updates error message to notify about the failed fetches.
function flashMessage(state = initialState, action) {
    const { type, status, message } = action;

    if (type === RESET_FLASH_MESSAGE) {
        return initialState;
    } else if (status && message) {
        return {
            ...state,
            status,
            message
        };
    }

    return state;
}

export default flashMessage;