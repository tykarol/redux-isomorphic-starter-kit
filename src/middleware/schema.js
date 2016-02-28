import { Schema, arrayOf } from 'normalizr';

const testSchema = new Schema('tests', { idAttribute: 'id' });
const loggedUser = {};

// Schemas for API responses.
export const Schemas = {
    LOGGED_USER: loggedUser,
    TEST: testSchema,
    TEST_ARRAY: arrayOf(testSchema)
};
