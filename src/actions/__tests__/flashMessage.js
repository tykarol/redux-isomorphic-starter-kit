import { expect } from 'chai';
import * as action from 'actions';

describe('actions::flashMessage', () => {
    it('should create an action to reset flash message', () => {
        const expectedAction = {
            type: action.RESET_FLASH_MESSAGE
        };

        expect(action.resetFlashMessage()).to.deep.equal(expectedAction);
    });
});
