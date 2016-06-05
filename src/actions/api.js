import { CALL_API } from 'middleware/api';
import { Schemas } from 'middleware/schema';

export const TEST_REQUEST = 'TEST_REQUEST';
export const TEST_SUCCESS = 'TEST_SUCCESS';
export const TEST_FAILURE = 'TEST_FAILURE';

function fetchTest(testId) {
    return {
        [CALL_API]: {
            types: [TEST_REQUEST, TEST_SUCCESS, TEST_FAILURE],
            endpoint: `tests/${testId}`,
            schema: Schemas.TEST
        }
    };
}

export function loadTest(testId, requiredFields = []) {
    return (dispatch, getState) => {
        const test = getState().entities.tests[testId];

        if (test && requiredFields.every(key => test.hasOwnProperty(key))) {
            return Promise.resolve();
        }

        return dispatch(fetchTest(testId));
    };
}

export const TESTS_REQUEST = 'TESTS_REQUEST';
export const TESTS_SUCCESS = 'TESTS_SUCCESS';
export const TESTS_FAILURE = 'TESTS_FAILURE';

function fetchTests(tag, nextPageUrl) {
    return {
        tag,
        [CALL_API]: {
            types: [TESTS_REQUEST, TESTS_SUCCESS, TESTS_FAILURE],
            endpoint: nextPageUrl,
            schema: Schemas.TEST_ARRAY
        }
    };
}

export function loadTests(tag, nextPage) {
    return (dispatch, getState) => {
        const {
            nextPageUrl = 'tests',
            pageCount = 0
        } = getState().pagination.testsByTag[tag] || {};

        if (pageCount > 0 && !nextPage) {
            return Promise.resolve();
        }

        return dispatch(fetchTests(tag, nextPageUrl));
    };
}
