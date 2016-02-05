import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

import { 
    TESTS_REQUEST,
    TESTS_SUCCESS,
    TESTS_FAILURE
} from 'actions';
import entities from './entities';
import paginate from './paginate';
import user from './user';
import flashMessage from './flashMessage';

// Updates the pagination data for different actions.
const pagination = combineReducers({
    testsByTag: paginate({
        mapActionToKey: action => action.tag,
        types: [
            TESTS_REQUEST,
            TESTS_SUCCESS,
            TESTS_FAILURE
        ]
    })
});

const rootReducer = combineReducers({
    user,
    entities,
    pagination,
    flashMessage,
    router
});

export default rootReducer;
