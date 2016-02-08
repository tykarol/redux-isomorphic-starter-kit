import merge from 'lodash/merge';

var initialState = {
    tests: {}
};

// Updates an entity cache in response to any action with response.entities.
export default function entities(state = initialState, action) {
    if (action.response && action.response.entities) {
        return merge({}, state, action.response.entities);
    }

    return state;
}